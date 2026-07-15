import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  input,
  output,
  signal,
  ViewEncapsulation
} from '@angular/core';
import { AngularControl } from '@rolster/angular-forms';
import {
  RlsButtonActionComponent,
  RlsInputPasswordComponent
} from '../../atoms';
import { RlsMessageFormErrorComponent } from '../message-form-error/message-form-error.component';

type PasswordType = 'password' | 'text';

@Component({
  selector: 'rls-field-password',
  standalone: true,
  templateUrl: 'field-password.component.html',
  styleUrls: ['field-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    RlsButtonActionComponent,
    RlsInputPasswordComponent,
    RlsMessageFormErrorComponent
  ]
})
export class RlsFieldPasswordComponent {
  public formControl = input<AngularControl<string>>();

  public type = input<PasswordType>('password');

  public label = input(true);

  public placeholder = input('');

  public readonly = input(false);

  public disabled = input(false);

  public value = output<string>();

  protected itIsPasswordVisible = signal(true);

  protected disabledInput = computed(
    () => this.formControl()?.disabled() ?? this.disabled()
  );

  public onAction(): void {
    this.itIsPasswordVisible.set(!this.itIsPasswordVisible());
  }

  public onValue(value: string): void {
    this.value.emit(value);
  }
}
