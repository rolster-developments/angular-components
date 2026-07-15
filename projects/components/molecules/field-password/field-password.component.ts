import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
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
  @Input()
  public formControl?: AngularControl<string>;

  @Input()
  public type: PasswordType = 'password';

  @Input()
  public label = true;

  @Input()
  public placeholder = '';

  @Input()
  public readonly = false;

  @Input()
  public disabled = false;

  @Output()
  public value: EventEmitter<string>;

  protected itIsPasswordVisible = true;

  constructor() {
    this.value = new EventEmitter();
  }

  public get disabledInput(): boolean {
    return this.formControl?.disabled ?? this.disabled;
  }

  public onAction() {
    this.itIsPasswordVisible = !this.itIsPasswordVisible;
  }

  public onValue(value: string): void {
    this.value.emit(value);
  }
}
