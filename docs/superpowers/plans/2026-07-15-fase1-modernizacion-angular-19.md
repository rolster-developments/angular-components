# Fase 1 — Modernización de @rolster/angular-components: Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Llevar `@rolster/angular-components` de Angular 17 + angular-forms 17.x a Angular 19 + angular-forms 19.x (Signals), con autoría signal-based en los 49 componentes y dependencias `@rolster/*` vigentes.

**Architecture:** Estrategia framework-primero en 4 etapas: (1) upgrade Angular 17→18→19 con build verde, (2) bump de dependencias `@rolster/*` que inicia el "tramo rojo", (3) reescritura por capas atoms→molecules→organisms guiada por los errores de `tsc`, con smoke spec por componente, (4) migración de la demo app y cierre con versión 19.0.0.

**Tech Stack:** Angular 19.2, ng-packagr 19, TypeScript ~5.8, Karma/Jasmine + TestBed, `@rolster/angular-forms` 19.5.3 (Signals API).

**Spec:** `docs/superpowers/specs/2026-07-15-angular-components-modernization-design.md`

## Global Constraints

- Repo: `d:\Developers\@rolster\typescript\rolster-angular-components`. Rama base: `production`. Rama de trabajo: `feature/angular-19-modernization`.
- Versiones destino exactas (package.json `dependencies`): `@angular/cdk ^19.2.0`, `@angular/common ^19.2.0`, `@angular/core ^19.2.0`, `@rolster/angular-forms ^19.5.3`, `@rolster/commons ^4.1.2`, `@rolster/components ^2.1.2`, `@rolster/dates ^4.1.3`, `@rolster/strings ^3.1.1`, `@rolster/validators ^3.1.2`.
- devDependencies destino: `@angular-devkit/build-angular ^19.2.0`, `@angular/cli ^19.2.0`, `@angular/compiler ^19.2.0`, `@angular/compiler-cli ^19.2.0`, `@angular/platform-browser ^19.2.0`, `@angular/platform-browser-dynamic ^19.2.0`, `@angular/router ^19.2.0`, `ng-packagr ^19.2.0`, `typescript ~5.8.0`, `zone.js ~0.15.0`, `jasmine-core ^5.6.0`, `@types/jasmine ^5.1.0`, `karma-jasmine ^5.1.0`, `karma-jasmine-html-reporter ^2.1.0`, `@types/node ^22.0.0`.
- La versión del paquete queda en `19.0.0` SOLO en la tarea final; no tocarla antes.
- API pública externa inmutable: mismos selectores `rls-*`, mismas clases `Rls*Component`, mismos nombres de inputs/outputs. Único cambio de tipos visible: `AngularControlEmpty<T>` → `AngularVoid<T>`.
- Comandos del repo: build librería `npm run build` (ng-packagr); tests `npx ng test @rolster/angular-components --watch=false --browsers=ChromeHeadless` (agregar `--include='**/<carpeta>/*.spec.ts'` para un solo componente); demo `npx ng build @rolster/components`; lint `npm run lint`; prettier `npx prettier --write <archivos>`.
- Commits con gitmoji como el historial del repo (`:recycle:`, `:arrow_up:`, `:wrench:`, `:white_check_mark:`). Un commit por componente migrado.
- PowerShell 5.1 en Windows: no usar `&&`; encadenar con `;`.

### Mapa de renombres de la API de @rolster/angular-forms (17.x → 19.x)

| API vieja (17.x) | API nueva (19.5.3) |
|---|---|
| `AngularControl<T>` con propiedades planas + `.subscribe(cb)` | `AngularControl<T>` con cada propiedad como `Signal` (no existe `subscribe`) |
| `AngularControlEmpty<T>` | `AngularVoid<T>` |
| `FormControls` (tipo para grupos) | `AngularFormControls` |
| `control.value` (lectura plana) | `control.value()` (Signal); `control.data` (getter plano, útil fuera de contexto reactivo) |
| `control.disabled` / `focused` / `wrong` / `error` / `errors` / `touched` / `valid` (planos) | Igual nombre, pero son `Signal` → se leen con `()` |
| — | Métodos imperativos SIN cambio: `setValue`, `touch`, `blur`, `focus`, `disable`, `enable`, `reset`, `setValidators`, `hasError`, `someErrors` |
| `FormGroup`, `formControl`, `formGroup` | Mismos nombres; grupo también expone Signals (`valid()`, `value()`) y getter `data` |

### Patrón de migración por componente (aplica a TODAS las tareas de las capas)

Cada componente que hoy usa `@Input() formControl` + `ngOnChanges` + `subscribe` se reescribe así:

1. `@Input() formControl?: AngularControl<T>` → `public formControl = input<AngularControl<T>>();` (usar `AngularVoid<T>` donde el tipo era `AngularControlEmpty<T>`).
2. Todos los demás `@Input() x = def;` → `public x = input(def);` y `@Output() y = new EventEmitter<T>()` → `public y = output<T>();` (import `input`, `output`, `computed`, `signal` desde `@angular/core`; eliminar `Input`, `Output`, `EventEmitter`, `OnChanges`, `OnDestroy`, `SimpleChanges` si quedan sin uso).
3. Eliminar `ngOnChanges`, `ngOnDestroy` de des-suscripción y el campo `unsubscription`. El valor se deriva con `computed()` leyendo los Signals del control.
4. Estado local de respaldo (cuando no hay `formControl`) se conserva como `signal()` privado; un `computed()` resuelve control-vs-local.
5. Getters derivados (`get disabledInput()`, etc.) → `computed()`. En el template, toda lectura pasa a llamada: `focusedInput` → `focusedInput()`, `[value]="input()"` → `[value]="inputValue()"`, `formControl?.wrong` → `formControl()?.wrong()`, `[placeholder]="placeholder"` → `[placeholder]="placeholder()"`.
6. Manejadores de eventos: `this.formControl?.blur()` → `this.formControl()?.blur()` (los métodos imperativos no cambian de nombre).
7. Componentes SIN `formControl`: solo aplican los puntos 2 y 5 (migración de inputs/outputs y template).
8. No cambiar nombres de selectores, clases, inputs ni outputs públicos. Variables internas pueden renombrarse solo si colisionan con la función `input()` (p. ej. el signal interno `input` del atom input pasa a `inputValue`).

### Plantilla de smoke spec (aplica a TODAS las tareas de las capas)

Para componentes CON `formControl` (crear `<carpeta>/<nombre>.component.spec.ts` junto al componente):

```ts
import { TestBed } from '@angular/core/testing';
import { formControl } from '@rolster/angular-forms';

import { RlsXxxComponent } from './xxx.component';

describe('RlsXxxComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsXxxComponent] })
  );

  it('debe renderizar', () => {
    const fixture = TestBed.createComponent(RlsXxxComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.rls-xxx')).toBeTruthy();
  });

  it('debe reflejar el valor y estado del formControl', () => {
    const control = formControl('inicial'); // ajustar tipo/valor al componente
    const fixture = TestBed.createComponent(RlsXxxComponent);
    fixture.componentRef.setInput('formControl', control);
    fixture.detectChanges();

    // ajustar el selector/atributo al render real del componente:
    expect(fixture.nativeElement.querySelector('input').value).toBe('inicial');

    control.setValue('cambiado');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('input').value).toBe('cambiado');
  });

  it('debe invocar métodos del control ante eventos de usuario', () => {
    const control = formControl('');
    const fixture = TestBed.createComponent(RlsXxxComponent);
    fixture.componentRef.setInput('formControl', control);
    fixture.detectChanges();

    const el = fixture.nativeElement.querySelector('input');
    el.value = 'abc';
    el.dispatchEvent(new Event('input'));

    expect(control.value()).toBe('abc');
  });
});
```

Para componentes SIN `formControl`: solo el test de render más un test de que un `input()` relevante se refleja (`fixture.componentRef.setInput('x', valor)` + assert sobre el DOM).

Ejecutar un spec: `npx ng test @rolster/angular-components --watch=false --browsers=ChromeHeadless --include='**/xxx/*.spec.ts'`.

**Nota del tramo rojo (tareas 5-8):** entre la tarea 4 y el fin de la tarea 8 el proyecto completo NO compila (los componentes sin migrar usan la API vieja). El gate por componente es su spec en verde (Karma compila solo lo incluido) y el gate por capa es que `--include` de la capa entera pase. No intentar `npm run build` hasta la tarea 9.

---

### Task 1: Rama de trabajo y línea base verde en Angular 17

**Files:**
- Ninguno (solo git + verificación).

**Interfaces:**
- Produce: rama `feature/angular-19-modernization` con build verde de partida, base para todas las tareas siguientes.

- [ ] **Step 1: Crear la rama desde production**

```powershell
cd d:\Developers\@rolster\typescript\rolster-angular-components
git checkout production; git pull; git checkout -b feature/angular-19-modernization
```

- [ ] **Step 2: Instalar dependencias y verificar build de librería**

```powershell
npm install
npm run build
```
Esperado: `dist/` generado sin errores.

- [ ] **Step 3: Verificar build de la demo**

```powershell
npx ng build @rolster/components
```
Esperado: compila sin errores (warnings de presupuesto CSS son aceptables).

### Task 2: Upgrade Angular 17 → 18

**Files:**
- Modify: `package.json`, `package-lock.json`, `angular.json` (migraciones automáticas de `ng update`).

**Interfaces:**
- Consume: rama y build verde de Task 1.
- Produce: proyecto compilando en Angular 18, requisito para el salto a 19.

- [ ] **Step 1: Ejecutar ng update a v18**

```powershell
npx ng update @angular/core@18 @angular/cli@18 @angular/cdk@18 ng-packagr@18 --force
```
`--force` es necesario porque `@rolster/angular-forms@17.5.2` declara peer de Angular 17; se reemplaza en Task 4.

- [ ] **Step 2: Verificar builds**

```powershell
npm run build; npx ng build @rolster/components
```
Esperado: ambos verdes. Si `ng update` migró el builder de la demo a `application`, aceptar la migración.

- [ ] **Step 3: Commit**

```powershell
git add -A; git commit -m ":arrow_up: Upgrade to Angular 18"
```

### Task 3: Upgrade Angular 18 → 19 + toolchain de tests

**Files:**
- Modify: `package.json`, `package-lock.json`, `angular.json`, `tsconfig.json`.

**Interfaces:**
- Consume: Angular 18 verde de Task 2.
- Produce: Angular 19.2 + TS ~5.8 + zone.js ~0.15 + Jasmine/Karma actualizados; base definitiva del framework.

- [ ] **Step 1: Ejecutar ng update a v19**

```powershell
npx ng update @angular/core@19 @angular/cli@19 @angular/cdk@19 ng-packagr@19 --force
```

- [ ] **Step 2: Actualizar toolchain de tests y tipos**

```powershell
npm install -D jasmine-core@^5.6.0 @types/jasmine@^5.1.0 karma-jasmine@^5.1.0 karma-jasmine-html-reporter@^2.1.0 @types/node@^22.0.0
```

- [ ] **Step 3: Verificar TS y zone.js**

Confirmar en `package.json`: `typescript ~5.8.x` y `zone.js ~0.15.x` (si `ng update` no los dejó ahí, instalarlos explícitamente con `npm install -D typescript@~5.8.0` y `npm install zone.js@~0.15.0`).

- [ ] **Step 4: Verificar builds y runner de tests**

```powershell
npm run build; npx ng build @rolster/components
npx ng test @rolster/angular-components --watch=false --browsers=ChromeHeadless
```
Esperado: builds verdes; Karma arranca y reporta "Executed 0 of 0" (no hay specs aún) sin errores de arranque.

- [ ] **Step 5: Commit**

```powershell
git add -A; git commit -m ":arrow_up: Upgrade to Angular 19 and refresh test toolchain"
```

### Task 4: Bump de dependencias @rolster (inicio del tramo rojo)

**Files:**
- Modify: `package.json`, `package-lock.json`.
- Create: `docs/superpowers/plans/red-state-errors.txt` (lista de errores como worklist, NO se commitea).

**Interfaces:**
- Consume: Angular 19 verde de Task 3.
- Produce: manifiesto con las seis dependencias `@rolster/*` en versión destino; lista de errores de compilación que guía las tareas 5-8.

- [ ] **Step 1: Actualizar dependencias @rolster**

```powershell
npm install @rolster/angular-forms@^19.5.3 @rolster/commons@^4.1.2 @rolster/components@^2.1.2 @rolster/dates@^4.1.3 @rolster/strings@^3.1.1 @rolster/validators@^3.1.2
```

- [ ] **Step 2: Capturar la lista de errores (worklist del tramo rojo)**

```powershell
npx ng build @rolster/components 2>$null | Out-File -Encoding utf8 docs/superpowers/plans/red-state-errors.txt; Get-Content docs/superpowers/plans/red-state-errors.txt -TotalCount 60
```
Esperado: errores de tipos en los ~36 archivos que usan la API vieja de forms. Esto es correcto y esperado.

- [ ] **Step 3: Commit (solo manifiesto)**

```powershell
git add package.json package-lock.json; git commit -m ":arrow_up: Bump @rolster dependencies to current majors (red state begins)"
```

### Task 5: Migrar el atom de referencia `rls-input` (TDD)

**Files:**
- Modify: `projects/components/atoms/input/input.component.ts`, `projects/components/atoms/input/input.component.html`
- Test: `projects/components/atoms/input/input.component.spec.ts`

**Interfaces:**
- Consume: API nueva de `@rolster/angular-forms` (Task 4): `AngularControl<T>` con Signals, `formControl()` factory.
- Produce: la implementación de referencia del patrón; las tareas 6-8 replican exactamente este estilo.

- [ ] **Step 1: Escribir el spec que falla**

Crear `projects/components/atoms/input/input.component.spec.ts`:

```ts
import { TestBed } from '@angular/core/testing';
import { formControl } from '@rolster/angular-forms';

import { RlsInputComponent } from './input.component';

describe('RlsInputComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsInputComponent] })
  );

  it('debe renderizar', () => {
    const fixture = TestBed.createComponent(RlsInputComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.rls-input')).toBeTruthy();
  });

  it('debe reflejar el valor y estado del formControl', () => {
    const control = formControl('inicial');
    const fixture = TestBed.createComponent(RlsInputComponent);
    fixture.componentRef.setInput('formControl', control);
    fixture.detectChanges();

    const el: HTMLInputElement =
      fixture.nativeElement.querySelector('.rls-input__component');

    expect(el.value).toBe('inicial');

    control.setValue('cambiado');
    fixture.detectChanges();

    expect(el.value).toBe('cambiado');

    control.disable();
    fixture.detectChanges();

    expect(el.disabled).toBeTrue();
  });

  it('debe invocar métodos del control ante eventos de usuario', () => {
    const control = formControl('');
    const fixture = TestBed.createComponent(RlsInputComponent);
    fixture.componentRef.setInput('formControl', control);
    fixture.detectChanges();

    const el: HTMLInputElement =
      fixture.nativeElement.querySelector('.rls-input__component');

    el.value = 'abc';
    el.dispatchEvent(new Event('input'));

    expect(control.value()).toBe('abc');

    el.dispatchEvent(new Event('blur'));

    expect(control.touched()).toBeTrue();
  });
});
```

- [ ] **Step 2: Correr el spec y verificar que falla**

```powershell
npx ng test @rolster/angular-components --watch=false --browsers=ChromeHeadless --include='**/atoms/input/*.spec.ts'
```
Esperado: FALLA compilando (el componente aún usa la API vieja: `subscribe` no existe).

- [ ] **Step 3: Reescribir el componente**

Reemplazar `projects/components/atoms/input/input.component.ts` por:

```ts
import {
  Component,
  computed,
  input,
  output,
  signal,
  ViewEncapsulation
} from '@angular/core';
import { AngularControl } from '@rolster/angular-forms';

type InputType = 'text' | 'number' | 'email';

@Component({
  selector: 'rls-input',
  standalone: true,
  templateUrl: 'input.component.html',
  styleUrls: ['input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RlsInputComponent {
  public formControl = input<AngularControl>();

  public type = input<InputType>('text');

  public placeholder = input('');

  public readonly = input(false);

  public disabled = input(false);

  public value = output<any>();

  private focused = signal(false);

  private localValue = signal<any>('');

  protected inputValue = computed(() => {
    const control = this.formControl();

    return String((control ? control.value() : this.localValue()) ?? '');
  });

  protected focusedInput = computed(
    () => this.formControl()?.focused() ?? this.focused()
  );

  protected disabledInput = computed(
    () => this.formControl()?.disabled() ?? this.disabled()
  );

  public onFocus(): void {
    this.formControl()?.focus();
    this.focused.set(true);
  }

  public onBlur(): void {
    this.formControl()?.blur();
    this.formControl()?.touch();
    this.focused.set(false);
  }

  public onInput(event: Event): void {
    const { value } = event.target as HTMLInputElement;
    const inputValue = this.type() === 'number' ? +value : value;

    const control = this.formControl();

    if (control) {
      control.setValue(inputValue);
    } else {
      this.localValue.set(inputValue);
    }

    this.value.emit(inputValue);
  }
}
```

Y `projects/components/atoms/input/input.component.html` por:

```html
<div
  class="rls-input"
  [class.rls-input--focused]="focusedInput()"
  [class.rls-input--disabled]="disabledInput()"
>
  <input
    class="rls-input__component"
    autocomplete="off"
    [type]="type()"
    [placeholder]="placeholder()"
    [readonly]="readonly()"
    [value]="inputValue()"
    [disabled]="disabledInput()"
    (focus)="onFocus()"
    (blur)="onBlur()"
    (input)="onInput($event)"
  />

  <span class="rls-input__value">
    <ng-content />
  </span>
</div>
```

- [ ] **Step 4: Correr el spec y verificar que pasa**

```powershell
npx ng test @rolster/angular-components --watch=false --browsers=ChromeHeadless --include='**/atoms/input/*.spec.ts'
```
Esperado: 3 specs PASS.

- [ ] **Step 5: Commit**

```powershell
git add projects/components/atoms/input; git commit -m ":recycle: Migrate rls-input to signals forms API"
```

### Task 6: Migrar los 21 atoms restantes

**Files:**
- Modify + Test: para cada `<n>` de la lista, `projects/components/atoms/<n>/<n>.component.ts`, `.html` y crear `.spec.ts`.

**Interfaces:**
- Consume: patrón de referencia de Task 5 (`atoms/input`), reglas del patrón y plantilla de spec de Global Constraints.
- Produce: capa atoms completa en la API nueva; las molecules (Task 7) importan estos atoms.

Lista (en orden; los marcados ⚙ tienen `formControl`, el resto solo migra inputs/outputs/template):

- [ ] `amount` ⚙
- [ ] `avatar`
- [ ] `badge`
- [ ] `button`
- [ ] `button-action`
- [ ] `checkbox` ⚙
- [ ] `icon`
- [ ] `input-money` ⚙
- [ ] `input-number` ⚙
- [ ] `input-password` ⚙
- [ ] `input-text` ⚙
- [ ] `label`
- [ ] `message-icon`
- [ ] `poster`
- [ ] `progress-bar`
- [ ] `progress-circular`
- [ ] `radiobutton` ⚙
- [ ] `skeleton`
- [ ] `skeleton-text`
- [ ] `switch` ⚙
- [ ] `tabular-text`

Nota: la marca ⚙ es indicativa; el criterio real es si el archivo importa `@rolster/angular-forms`. Verificar con: `Select-String -Path projects/components/atoms/<n>/*.ts -Pattern 'angular-forms'`.

Ciclo por componente (5 pasos, idéntico a Task 5):

- [ ] **Step 1:** Crear `<n>.component.spec.ts` desde la plantilla de Global Constraints (ajustar selector CSS raíz `rls-<n>`, tipo del control y el elemento sobre el que se hace assert; para atoms sin `formControl`, solo render + reflejo de un `input()`).
- [ ] **Step 2:** Correr `npx ng test @rolster/angular-components --watch=false --browsers=ChromeHeadless --include='**/atoms/<n>/*.spec.ts'` → debe FALLAR (API vieja no compila o assert nuevo no se cumple).
- [ ] **Step 3:** Reescribir `.ts` y `.html` aplicando las 8 reglas del patrón (Global Constraints). Mantener el estilo del ejemplo de Task 5.
- [ ] **Step 4:** Correr el mismo comando → PASS.
- [ ] **Step 5:** `git add projects/components/atoms/<n>; git commit -m ":recycle: Migrate rls-<n> to signals API"`.

Gate de cierre de capa:

- [ ] **Gate:** `npx ng test @rolster/angular-components --watch=false --browsers=ChromeHeadless --include='**/atoms/**/*.spec.ts'` → todos PASS.

### Task 7: Migrar las 15 molecules

**Files:**
- Modify + Test: para cada `<n>`, `projects/components/molecules/<n>/<n>.component.ts`, `.html` y crear `.spec.ts`.

**Interfaces:**
- Consume: atoms migrados (Task 6); patrón y plantilla de Global Constraints.
- Produce: capa molecules completa; los organisms (Task 8) importan estas molecules.

Lista (en orden):

- [ ] `message-form-error` (hacerla PRIMERO: casi todas las field-* la componen)
- [ ] `ballot`
- [ ] `field-money`
- [ ] `field-number`
- [ ] `field-password`
- [ ] `field-text`
- [ ] `label-checkbox`
- [ ] `label-radiobutton`
- [ ] `label-switch`
- [ ] `pagination`
- [ ] `picker-day`
- [ ] `picker-day-range`
- [ ] `picker-month`
- [ ] `picker-month-title`
- [ ] `picker-year`

Ejemplo trabajado — `message-form-error` (`projects/components/molecules/message-form-error/message-form-error.component.ts`) queda:

```ts
import { CommonModule } from '@angular/common';
import { Component, input, ViewEncapsulation } from '@angular/core';
import { AngularControl } from '@rolster/angular-forms';

import { RlsMessageIconComponent } from '../../atoms/message-icon/message-icon.component';

@Component({
  selector: 'rls-message-form-error',
  standalone: true,
  templateUrl: 'message-form-error.component.html',
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, RlsMessageIconComponent]
})
export class RlsMessageFormErrorComponent {
  public className = input('rls-message-form-error');

  public formControl = input<AngularControl>();
}
```

En su template, toda lectura de control se vuelve llamada de Signal: `formControl?.wrong` → `formControl()?.wrong()`, `formControl?.error?.message` → `formControl()?.error()?.message`, `[class]="className"` → `[class]="className()"`. Su spec debe verificar: sin control no renderiza mensaje; con un control inválido y tocado (`formControl(..., { validators: [...] })` + `control.touch()`) sí renderiza.

Las `field-*` pasan el mismo `formControl` que reciben a su input/atom interno y a `rls-message-form-error`; en el template eso queda `[formControl]="formControl()"`.

Ciclo por componente y gate: idénticos a Task 6, con rutas `molecules/<n>` y commit `":recycle: Migrate rls-<n> to signals API"`.

- [ ] **Gate:** `npx ng test @rolster/angular-components --watch=false --browsers=ChromeHeadless --include='**/molecules/**/*.spec.ts'` → todos PASS.

### Task 8: Migrar los organisms, sus controls y servicios

**Files:**
- Modify + Test: para cada `<n>` de la lista, `projects/components/organisms/<n>/<n>.component.ts`, `.html`, crear `.spec.ts`.
- Modify: `projects/components/organisms/picker-date/picker-date.controls.ts`, `projects/components/organisms/picker-date-range/picker-date-range.controls.ts`.
- Modify (solo si los errores de tsc lo exigen): `*.component.service.ts` de `bottom-sheet`, `confirmation`, `modal`; `projects/services/portal.service.ts`; `projects/models/*.ts`.

**Interfaces:**
- Consume: atoms + molecules migrados; `PickerListener`/`ListElement` de `@rolster/components@2.x`.
- Produce: librería completa en API nueva; Task 9 la compila entera.

- [ ] **Step 0 (previo a los pickers): verificar API de @rolster/components 2.x**

Leer `node_modules/@rolster/components/dist/esm/index.d.ts` (o `dist/types`) y confirmar nombres/firmas de `PickerListener`, `PickerListenerType`, `ListElement` y helpers de navegación usados por `field-date`, `field-date-range`, `field-select`, `field-autocomplete`. Anotar cualquier renombre y aplicarlo durante la migración de esos componentes. (Riesgo señalado en el spec: 0.3.x → 2.x.)

- [ ] **Step 0b: migrar los controls de pickers**

`projects/components/organisms/picker-date/picker-date.controls.ts` queda (cambia el import `FormControls` → `AngularFormControls`; la clase no cambia de lógica):

```ts
import {
  AngularControl,
  AngularFormControls,
  formControl,
  FormGroup
} from '@rolster/angular-forms';

interface PickerDateControls extends AngularFormControls {
  day: AngularControl<number>;
  month: AngularControl<number>;
  year: AngularControl<number>;
}

export class PickerDateGroup extends FormGroup<PickerDateControls> {
  public readonly day: AngularControl<number>;

  public readonly month: AngularControl<number>;

  public readonly year: AngularControl<number>;

  constructor(date: Date) {
    const year = formControl(date.getFullYear());
    const month = formControl(date.getMonth());
    const day = formControl(date.getDate());

    super({
      controls: { day, month, year }
    });

    this.day = day;
    this.month = month;
    this.year = year;
  }

  public setDate(date: Date): void {
    this.year.setValue(date.getFullYear());
    this.month.setValue(date.getMonth());
    this.day.setValue(date.getDate());
  }
}
```

Aplicar el mismo cambio a `picker-date-range.controls.ts`. Las lecturas de estos controles en componentes/templates pasan a Signals: `group.day.value` → `group.day.value()` (o `group.day.data` fuera de contexto reactivo).

Lista de componentes (en orden):

- [ ] `picker-date` (incluye sus controls)
- [ ] `picker-date-range` (incluye sus controls)
- [ ] `field-date`
- [ ] `field-date-range`
- [ ] `field-select`
- [ ] `field-autocomplete`
- [ ] `modal` (+ `modal.component.service.ts` si tsc lo exige)
- [ ] `bottom-sheet` (+ service)
- [ ] `confirmation` (+ service)

Notas específicas:
- `field-date` hoy usa `AngularControlEmpty<Date>` → `AngularVoid<Date>`, y su `ngOnChanges`+`subscribe` para formatear la fecha se reemplaza por `computed()` que lee `formControl()?.value()` y formatea.
- Los specs de organisms con overlay (`modal`, `bottom-sheet`, `confirmation`) solo hacen smoke de render del host; no probar el flujo de overlay en esta fase.
- Ciclo por componente y commits: idénticos a Task 6 con rutas `organisms/<n>`.

- [ ] **Gate:** `npx ng test @rolster/angular-components --watch=false --browsers=ChromeHeadless --include='**/organisms/**/*.spec.ts'` → todos PASS.

### Task 9: Compilación completa, demo app y limpieza final

**Files:**
- Modify: archivos de `src/` (demo) que usen la API vieja de forms.
- Delete: `docs/superpowers/plans/red-state-errors.txt`.

**Interfaces:**
- Consume: librería completa migrada (Tasks 5-8).
- Produce: build de ng-packagr verde + demo funcional — fin del tramo rojo.

- [ ] **Step 1: Suite completa de la librería**

```powershell
npx ng test @rolster/angular-components --watch=false --browsers=ChromeHeadless
```
Esperado: ~49 archivos de spec, todos PASS.

- [ ] **Step 2: Build de la librería (fin del tramo rojo)**

```powershell
npm run clean; npm run build
```
Esperado: `dist/` generado sin errores. Cualquier error residual aquí es un archivo no migrado: migrarlo con el patrón y volver a correr.

- [ ] **Step 3: Migrar la demo (src/)**

Buscar usos de la API vieja: `Select-String -Path src -Pattern 'angular-forms' -Recurse`. Aplicar el patrón (los formularios de la demo usan `formControl()`/`FormGroup` nuevos; lecturas → Signals). Verificar:

```powershell
npx ng build @rolster/components
```
Esperado: verde.

- [ ] **Step 4: Verificación visual de la demo**

```powershell
npx ng serve
```
Abrir `http://localhost:4200` y comprobar manualmente: un field de texto con validación (mensaje de error al tocar y dejar vacío), `field-date` (abre picker y setea valor), `field-select`. Cerrar el server al terminar.

- [ ] **Step 5: Lint y formato**

```powershell
npm run lint:fix; npx prettier --write .
```
Esperado: sin errores de lint (warnings aceptables). Borrar `docs/superpowers/plans/red-state-errors.txt`.

- [ ] **Step 6: Commit**

```powershell
git add -A; git commit -m ":white_check_mark: Migrate demo app and green full build on Angular 19"
```

### Task 10: Versión 19.0.0 y verificación de empaquetado

**Files:**
- Modify: `package.json` (version).

**Interfaces:**
- Consume: build y suite verdes de Task 9.
- Produce: paquete listo para publicar como `@rolster/angular-components@19.0.0`.

- [ ] **Step 1: Subir versión**

En `package.json`: `"version": "19.0.0"`.

- [ ] **Step 2: Build + pack de inspección**

```powershell
npm run clean; npm run build; npm pack --dry-run
```
Esperado: el tarball lista solo `dist/` + `package.json` + README/LICENSE; nombre `rolster-angular-components-19.0.0.tgz`.

- [ ] **Step 3: Suite final completa**

```powershell
npx ng test @rolster/angular-components --watch=false --browsers=ChromeHeadless; npm run lint
```
Esperado: todo verde.

- [ ] **Step 4: Commit final**

```powershell
git add package.json package-lock.json; git commit -m ":bookmark: Bump to 19.0.0 (Angular 19 + signals forms API)"
```

---

## Verificación final del plan (checklist del ejecutor al cerrar)

- [ ] Los 49 componentes tienen spec y pasan.
- [ ] `npm run build` (ng-packagr) verde.
- [ ] Demo compila y los flujos de formulario funcionan visualmente.
- [ ] Cero imports de `AngularControlEmpty`, `FormControls` (nombre viejo) o `.subscribe(` sobre controles en `projects/`.
- [ ] Cero `ngOnChanges`/`EventEmitter`/`@Input()`/`@Output()` en `projects/components/`.
- [ ] `package.json` con las versiones exactas de Global Constraints y version `19.0.0`.
