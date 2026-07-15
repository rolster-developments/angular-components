import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  signal,
  SimpleChanges,
  ViewEncapsulation} from '@angular/core';
import { AngularControl } from '@rolster/angular-forms';

type InputType = 'text' | 'number' | 'email';

@Component({
  selector: 'rls-input',
  standalone: true,
  templateUrl: 'input.component.html',
  styleUrls: ['input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RlsInputComponent implements OnChanges, OnDestroy {
  @Input()
  public formControl?: AngularControl<any>;

  @Input()
  public type: InputType = 'text';

  @Input()
  public placeholder = '';

  @Input()
  public readonly = false;

  @Input()
  public disabled = false;

  @Output()
  public value: EventEmitter<any>;

  private unsubscription?: () => void;

  private focused = false;

  protected input = signal<any>('');

  constructor() {
    this.value = new EventEmitter();
  }

  public ngOnDestroy(): void {
    this.unsubscription && this.unsubscription();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const { formControl } = changes;

    if (formControl) {
      this.unsubscription && this.unsubscription();

      this.unsubscription = formControl.currentValue?.subscribe(
        (value: any) => {
          this.input.set(String(value ?? ''));
        }
      );
    }
  }

  public get focusedInput(): boolean {
    return this.formControl?.focused ?? this.focused;
  }

  public get disabledInput(): boolean {
    return this.formControl?.disabled ?? this.disabled;
  }

  public onFocus(): void {
    this.formControl?.focus();
    this.focused = true;
  }

  public onBlur(): void {
    this.formControl?.blur();
    this.formControl?.touch();
    this.focused = false;
  }

  public onInput(event: Event): void {
    const { value } = event.target as HTMLInputElement;
    const inputValue = this.type === 'number' ? +value : value;

    if (this.formControl) {
      this.formControl.setValue(inputValue);
    } else {
      this.input.set(inputValue);
    }

    this.value.emit(inputValue);
  }
}
