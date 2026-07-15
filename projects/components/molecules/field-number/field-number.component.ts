import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  input,
  output,
  ViewEncapsulation
} from '@angular/core';
import { AngularControl } from '@rolster/angular-forms';

import { RlsInputNumberComponent } from '../../atoms';
import { RlsMessageFormErrorComponent } from '../message-form-error/message-form-error.component';

@Component({
  selector: 'rls-field-number',
  standalone: true,
  templateUrl: 'field-number.component.html',
  styleUrls: ['field-number.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    RlsInputNumberComponent,
    RlsMessageFormErrorComponent
  ]
})
export class RlsFieldNumberComponent {
  public formControl = input<AngularControl<number>>();

  public label = input(true);

  public placeholder = input('');

  public readonly = input(false);

  public disabled = input(false);

  public value = output<number>();

  protected disabledInput = computed(
    () => this.formControl()?.disabled() ?? this.disabled()
  );

  public onValue(value: number): void {
    this.value.emit(value);
  }
}
