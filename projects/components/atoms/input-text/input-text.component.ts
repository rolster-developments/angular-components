import {
  Component,
  computed,
  input,
  output,
  signal,
  ViewEncapsulation
} from '@angular/core';
import { AngularControl } from '@rolster/angular-forms';

import { RlsInputComponent } from '../input/input.component';

type TextType = 'text' | 'email';

@Component({
  selector: 'rls-input-text',
  standalone: true,
  templateUrl: 'input-text.component.html',
  styleUrls: ['input-text.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [RlsInputComponent]
})
export class RlsInputTextComponent {
  public formControl = input<AngularControl<string>>();

  public type = input<TextType>('text');

  public placeholder = input('');

  public readonly = input(false);

  public disabled = input(false);

  public value = output<string>();

  private localValue = signal('');

  protected inputValue = computed(
    () => this.formControl()?.value() ?? this.localValue()
  );

  public onValue(value: string): void {
    this.localValue.set(value);
    this.value.emit(value);
  }
}
