import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  input,
  output,
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
  public formControl = input<AngularControl<string>>();

  public type = input<TextType>('text');

  public label = input(true);

  public placeholder = input('');

  public readonly = input(false);

  public disabled = input(false);

  public value = output<string>();

  protected disabledInput = computed(
    () => this.formControl()?.disabled() ?? this.disabled()
  );

  public onValue(value: string): void {
    this.value.emit(value);
  }
}
