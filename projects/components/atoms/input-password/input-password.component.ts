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

type PasswordType = 'password' | 'text';

@Component({
  selector: 'rls-input-password',
  standalone: true,
  templateUrl: 'input-password.component.html',
  styleUrls: ['input-password.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RlsInputPasswordComponent implements OnChanges, OnDestroy {
  @Input()
  public formControl?: AngularControl<string>;

  @Input()
  public type: PasswordType = 'password';

  @Input()
  public placeholder = '';

  @Input()
  public readonly = false;

  @Input()
  public disabled = false;

  @Output()
  public value: EventEmitter<string>;

  private unsubscription?: () => void;

  private focused = false;

  protected input = signal<string>('');

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
        (value: string) => {
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

    if (this.formControl) {
      this.formControl.setValue(value);
    } else {
      this.input.set(value);
    }

    this.value.emit(value);
  }
}
