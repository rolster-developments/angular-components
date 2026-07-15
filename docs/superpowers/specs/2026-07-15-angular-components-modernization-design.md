# Fase 1 — Modernización de @rolster/angular-components

**Fecha:** 2026-07-15
**Estado:** Aprobado
**Contexto:** Primera fase del plan para alinear `@rolster/angular-components` con `@rolster/react-components`. Esta fase moderniza la base (framework, dependencias, API de forms); las fases 2 (cierre de brecha de componentes) y 3 (contrato de paridad) quedan fuera de alcance.

## Objetivo

Llevar `@rolster/angular-components` de Angular 17 + `@rolster/angular-forms` 17.x (API de suscripciones) a Angular 19 + `@rolster/angular-forms` 19.x (API de Signals), con autoría de componentes signal-based y todas las dependencias `@rolster/*` en sus versiones vigentes.

## Estado final

| Aspecto | Antes | Después |
|---|---|---|
| Versión del paquete | 17.0.1 | 19.0.0 (el versionado sigue el major del framework, como angular-forms 19.x y react-forms 19.x) |
| Angular (core/common/cdk/cli) | ^17.3 | ^19.2 |
| ng-packagr | ^17.3 | ^19 |
| TypeScript | ^5.2 | ~5.8 (Angular 19 no soporta TS 6) |
| zone.js | ~0.14 | ~0.15 |
| @rolster/angular-forms | ^17.5.2 | ^19.5.3 |
| @rolster/commons | ^2.0.5 | ^4.1.2 |
| @rolster/components | ^0.3.10 | ^2.1.2 |
| @rolster/dates | ^2.0.0 | ^4.1.3 |
| @rolster/strings | ^2.0.0 | ^3.1.1 |
| @rolster/validators | ^1.0.5 | ^3.1.2 |
| Autoría de componentes | `@Input()`/`@Output()`, `ngOnChanges` + `subscribe` manual | `input()`/`output()`/`computed()`, sin suscripciones manuales |
| Tests | Karma configurado, 0 specs | Karma/Jasmine + TestBed, 1 smoke spec por componente |
| Demo app (`src/`) | Angular 17 | Angular 19, verificación visual |

Los 49 componentes actuales (22 atoms, 15 molecules, 12 organisms) conservan su API pública externa: mismos selectores `rls-*`, mismos nombres de clase `Rls*Component`, misma prop `formControl`. El cambio de tipo de `AngularControlEmpty<T>` (API vieja) a `AngularVoid<T>` (API nueva) es el único cambio visible en la superficie de tipos.

## Patrón de migración por componente

Patrón actual (ver `projects/components/atoms/input/input.component.ts`):

```ts
@Input() public formControl?: AngularControl<any>;

ngOnChanges(changes: SimpleChanges) {
  const { formControl } = changes;
  if (formControl) {
    this.unsubscription?.();
    this.unsubscription = formControl.currentValue?.subscribe((v) => ...);
  }
}
onBlur() { this.formControl?.blur(); this.formControl?.touch(); }
```

Patrón destino:

```ts
public formControl = input<AngularControl<T>>();

// La nueva API expone cada propiedad como Signal:
// control.value(), control.disabled(), control.wrong(), control.error()
protected value = computed(() => this.formControl()?.value() ?? this.localValue());

onBlur() { this.formControl()?.blur(); this.formControl()?.touch(); }
```

Reglas del patrón:

1. `@Input() formControl` → `input<AngularControl<T>>()` (o `AngularVoid<T>` donde el valor es opcional).
2. Eliminar `ngOnChanges`, `OnDestroy`-para-unsubscribe y el patrón `SimpleChange.currentValue.subscribe`.
3. Estado derivado con `computed()` que resuelve control-vs-estado-local (los componentes funcionan sin `formControl`, con signal local de respaldo, igual que hoy).
4. El resto de `@Input()`/`@Output()` del componente migran a `input()`/`output()` en la misma pasada.
5. Los métodos imperativos del control (`setValue`, `touch`, `blur`, `focus`, `disable`, `enable`, `reset`) se conservan con el mismo nombre en la nueva API.
6. Los `FormGroup` internos de los pickers (`picker-date.controls.ts`, `picker-date-range.controls.ts`) migran al `FormGroup`/`formControl` signal-based de angular-forms 19; el acceso a valores pasa a `control.value()` o al getter `data`.
7. `RlsMessageFormErrorComponent` lee `wrong()` y `error()` como signals.

## Etapas de ejecución

**Etapa 1 — Upgrade de framework (estado verde).** Rama de trabajo. `ng update` en dos saltos (17→18, 18→19) para core, cdk, cli y ng-packagr; TS ~5.8 y zone.js ~0.15. Se mantiene temporalmente `angular-forms` 17.5.2 (`--legacy-peer-deps` si es necesario). Cierre: build de ng-packagr y demo compilando en Angular 19.

**Etapa 2 — Bump de dependencias @rolster (inicio del tramo rojo).** Actualizar las seis dependencias `@rolster/*` a las versiones de la tabla. El proyecto deja de compilar; los errores de `tsc` son la lista de trabajo de la etapa 3. Commit del cambio de manifiesto.

**Etapa 3 — Reescritura por capas.** Orden por grafo de composición: atoms (22) → molecules (15) → organisms (12) + controls internos. Por componente: reescritura según el patrón + smoke spec (TestBed: el componente renderiza y el binding de `formControl` refleja valor/estado) + commit. Cierre de cada capa: typecheck de la capa sin errores y specs de la capa en verde.

**Etapa 4 — Demo app y cierre.** Migrar `src/` (demo) al nuevo API, build completo de ng-packagr, suite completa de Karma, lint + prettier, versión a `19.0.0`.

## Verificación

- **Por componente:** smoke spec (renderiza; con un `formControl` enlazado, cambios de valor/estado se reflejan y los eventos llaman a los métodos del control).
- **Por etapa:** `tsc` sin errores en lo migrado + build de ng-packagr donde aplique.
- **Final:** build de librería verde, suite Karma verde, demo app funcional (verificación visual de campos con formularios), `npm pack` inspeccionable.

## Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| `@rolster/components` 0.3→2.x con breaking changes propios (`PickerListener`, `ListElement`, helpers de navegación) | Revisar su changelog/API al iniciar los pickers (etapa 3, organisms); son ~8 componentes afectados |
| Majors nuevos de `commons`/`dates`/`strings` renombran helpers | Los errores de `tsc` de la etapa 2 los delatan; corregir por componente |
| Tramo rojo largo en etapa 3 (nada compila hasta terminar atoms) | Commits por componente + typecheck por capa; el orden atoms→molecules→organisms minimiza dependencias rotas hacia arriba |
| Karma deprecado | Aceptado explícitamente: soportado en Angular 19; migrar de runner queda fuera de alcance |
| `list-field.model` no exportado en el barrel de models (bug preexistente) | No se corrige en esta fase salvo que la migración lo obligue; anotar para fase 3 |

## Fuera de alcance

- Portar componentes nuevos desde react-components (fase 2).
- Contrato de paridad de API entre las dos librerías (fase 3).
- Migrar de Karma a otro runner de tests.
- Cambios en `@rolster/angular-forms`, `@rolster/styles-foundations` o cualquier otro paquete del ecosistema.
- Angular 20/21 (requeriría ampliar peers de angular-forms).
