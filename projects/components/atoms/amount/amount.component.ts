import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  signal,
  SimpleChanges,
  ViewEncapsulation} from '@angular/core';
import { currencyFormat } from '@rolster/commons';

import { RlsTabularTextComponent } from '../tabular-text/tabular-text.component';

@Component({
  selector: 'rls-amount',
  standalone: true,
  templateUrl: 'amount.component.html',
  styleUrls: ['amount.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, RlsTabularTextComponent]
})
export class RlsAmountComponent implements OnChanges {
  @Input()
  public value = 0;

  @Input()
  public decimals = false;

  @Input()
  public symbol = '';

  protected valueFormat = signal('');

  public ngOnChanges(changes: SimpleChanges): void {
    const { decimals, value } = changes;

    if (value || decimals) {
      this.valueFormat.set(
        currencyFormat({
          value: value?.currentValue ?? this.value,
          decimals: decimals?.currentValue ?? this.decimals
        })
      );
    }
  }
}
