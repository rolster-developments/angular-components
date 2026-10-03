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

/**
 * Opciones de formateo expuestas por el control (ver `FormatterOptions` en
 * `@rolster/forms`). Se declaran de forma estructural para que el componente
 * compile con versiones de `@rolster/angular-forms` anteriores a la que
 * incorpora el formateador; en ellas simplemente no hay formateador.
 */
interface FormatterControl<T = any> {
  formatOn?: 'input' | 'blur';
  formatter?: (value: T) => T;
}

function selectionStartOf(element: HTMLInputElement): number | null {
  try {
    // Lanza o retorna null en inputs sin selección (number, email, etc.)
    return element.selectionStart;
  } catch {
    return null;
  }
}

/**
 * Escribe el valor formateado directamente en el DOM y conserva la posición
 * del cursor, corrigiéndola por la diferencia de longitud. Es necesario
 * porque, cuando el formateador rechaza un carácter, el signal del control
 * no cambia y el binding `[value]` no vuelve a escribir el input.
 */
function writeInputValue(element: HTMLInputElement, valueInput: string): void {
  const rawInput = element.value;

  if (rawInput === valueInput) {
    return;
  }

  const selection = selectionStartOf(element);

  element.value = valueInput;

  if (selection !== null) {
    const offset = valueInput.length - rawInput.length;
    const caret = Math.max(0, Math.min(selection + offset, valueInput.length));

    element.setSelectionRange(caret, caret);
  }
}

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

  private composing = false;

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

  public onCompositionStart(): void {
    this.composing = true;
  }

  public onCompositionEnd(event: Event): void {
    this.composing = false;
    this.onInput(event);
  }

  public onInput(event: Event): void {
    const element = event.target as HTMLInputElement;
    const rawInput = element.value;
    const parsed = this.type() === 'number' ? +rawInput : rawInput;

    const control = this.formControl();
    const { formatter, formatOn } = (control ?? {}) as FormatterControl;

    const value =
      formatter && formatOn !== 'blur' && !this.composing
        ? formatter(parsed)
        : parsed;

    if (!Object.is(value, parsed)) {
      writeInputValue(element, String(value ?? ''));
    }

    if (control) {
      control.setValue(value);
    } else {
      this.localValue.set(value);
    }

    this.value.emit(value);
  }
}
