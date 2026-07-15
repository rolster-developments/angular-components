import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
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
  @Input()
  public formControl?: AngularControl<number>;

  @Input()
  public label = true;

  @Input()
  public placeholder = '';

  @Input()
  public readonly = false;

  @Input()
  public disabled = false;

  @Input()
  public decimals = false;

  @Input()
  public symbol = '';

  @Output()
  public value: EventEmitter<number>;

  constructor() {
    this.value = new EventEmitter();
  }

  public get disabledInput(): boolean {
    return this.formControl?.disabled ?? this.disabled;
  }

  public onValue(value: number): void {
    this.value.emit(value);
  }
}
