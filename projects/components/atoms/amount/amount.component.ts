import { CommonModule } from '@angular/common';
import { Component, computed, input, ViewEncapsulation } from '@angular/core';
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
export class RlsAmountComponent {
  public value = input(0);

  public decimals = input(false);

  public symbol = input('');

  protected valueFormat = computed(() =>
    currencyFormat({
      value: this.value(),
      decimals: Number(this.decimals())
    })
  );
}
