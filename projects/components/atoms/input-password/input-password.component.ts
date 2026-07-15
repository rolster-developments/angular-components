import {
  Component,
  computed,
  input,
  output,
  signal,
  ViewEncapsulation
} from '@angular/core';
import { AngularControl } from '@rolster/angular-forms';

type PasswordType = 'password' | 'text';

@Component({
  selector: 'rls-input-password',
  standalone: true,
  templateUrl: 'input-password.component.html',
  styleUrls: ['input-password.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RlsInputPasswordComponent {
  public formControl = input<AngularControl<string>>();

  public type = input<PasswordType>('password');

  public placeholder = input('');

  public readonly = input(false);

  public disabled = input(false);

  public value = output<string>();

  private focused = signal(false);

  private localValue = signal('');

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

    const control = this.formControl();

    if (control) {
      control.setValue(value);
    } else {
      this.localValue.set(value);
    }

    this.value.emit(value);
  }
}
