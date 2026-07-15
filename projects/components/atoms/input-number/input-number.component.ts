import {
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
  ViewEncapsulation} from '@angular/core';
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
  @Input()
  public formControl?: AngularControl<number>;

  @Input()
  public placeholder = '';

  @Input()
  public readonly = false;

  @Input()
  public disabled = false;

  @Output()
  public value: EventEmitter<number>;

  protected input = signal<number>(0);

  constructor() {
    this.value = new EventEmitter();
  }

  public onValue(value: number): void {
    this.input.set(value);
    this.value.emit(value);
  }
}
