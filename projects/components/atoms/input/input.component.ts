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
