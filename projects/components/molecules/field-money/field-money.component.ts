import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  input,
  output,
  ViewEncapsulation
} from '@angular/core';
import { AngularControl } from '@rolster/angular-forms';
import { RlsInputMoneyComponent } from '../../atoms';
import { RlsMessageFormErrorComponent } from '../message-form-error/message-form-error.component';

@Component({
  selector: 'rls-field-money',
  standalone: true,
  templateUrl: 'field-money.component.html',
  styleUrls: ['field-money.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, RlsInputMoneyComponent, RlsMessageFormErrorComponent]
})
export class RlsFieldMoneyComponent {
  public formControl = input<AngularControl<number>>();

  public label = input(true);

  public placeholder = input('');

  public readonly = input(false);

  public disabled = input(false);

  public decimals = input(false);

  public symbol = input('');

  public value = output<number>();

  protected disabledInput = computed(
    () => this.formControl()?.disabled() ?? this.disabled()
  );

  public onValue(value: number): void {
    this.value.emit(value);
  }
}
