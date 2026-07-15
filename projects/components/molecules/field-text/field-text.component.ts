import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { AngularControl } from '@rolster/angular-forms';

import { RlsInputTextComponent } from '../../atoms';
import { RlsMessageFormErrorComponent } from '../message-form-error/message-form-error.component';

type TextType = 'text' | 'email';

@Component({
  selector: 'rls-field-text',
  standalone: true,
  templateUrl: 'field-text.component.html',
  styleUrls: ['field-text.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, RlsInputTextComponent, RlsMessageFormErrorComponent]
})
export class RlsFieldTextComponent {
  @Input()
  public formControl?: AngularControl<string>;

  @Input()
  public type: TextType = 'text';

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

  constructor() {
    this.value = new EventEmitter();
  }

  public get disabledInput(): boolean {
    return this.formControl?.disabled ?? this.disabled;
  }

  public onValue(value: string): void {
    this.value.emit(value);
  }
}
