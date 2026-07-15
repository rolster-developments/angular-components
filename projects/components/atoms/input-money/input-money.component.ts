import {
  Component,
  computed,
  input,
  output,
  signal,
  ViewEncapsulation
} from '@angular/core';
import { AngularControl } from '@rolster/angular-forms';

import { RlsAmountComponent } from '../amount/amount.component';
import { RlsInputComponent } from '../input/input.component';

@Component({
  selector: 'rls-input-money',
  standalone: true,
  templateUrl: 'input-money.component.html',
  styleUrls: ['input-money.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [RlsAmountComponent, RlsInputComponent]
})
export class RlsInputMoneyComponent {
  public formControl = input<AngularControl<number>>();

  public placeholder = input('');

  public readonly = input(false);

  public disabled = input(false);

  public decimals = input(false);

  public symbol = input('');

  public value = output<number>();

  private localValue = signal(0);

  protected inputValue = computed(
    () => this.formControl()?.value() ?? this.localValue()
  );

  public onValue(value: number): void {
    this.localValue.set(value);
    this.value.emit(value);
  }
}
