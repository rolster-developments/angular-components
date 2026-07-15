import {
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
  ViewEncapsulation} from '@angular/core';
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
  @Input()
  public formControl?: AngularControl<string>;

  @Input()
  public type: TextType = 'text';

  @Input()
  public placeholder = '';

  @Input()
  public readonly = false;

  @Input()
  public disabled = false;

  @Output()
  public value: EventEmitter<string>;

  protected input = signal<string>('');

  constructor() {
    this.value = new EventEmitter();
  }

  public onValue(value: string): void {
    this.input.set(value);
    this.value.emit(value);
  }
}
