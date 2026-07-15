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

@Component({
  selector: 'rls-input-number',
  standalone: true,
  templateUrl: 'input-number.component.html',
  styleUrls: ['input-number.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [RlsInputComponent]
})
export class RlsInputNumberComponent {
  public formControl = input<AngularControl<number>>();

  public placeholder = input('');

  public readonly = input(false);

  public disabled = input(false);

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
