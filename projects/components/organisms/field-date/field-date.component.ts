import { CommonModule } from '@angular/common';
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
import { AngularControlEmpty } from '@rolster/angular-forms';
import { PickerListener, PickerListenerType } from '@rolster/components';
import { dateFormatTemplate } from '@rolster/dates';

import { RlsButtonActionComponent } from '../../atoms';
import { RlsMessageFormErrorComponent } from '../../molecules';
import { RlsModalComponent } from '../modal/modal.component';
import { RlsPickerDateComponent } from '../picker-date/picker-date.component';

@Component({
  selector: 'rls-field-date',
  standalone: true,
  templateUrl: 'field-date.component.html',
  styleUrls: ['field-date.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    RlsButtonActionComponent,
    RlsMessageFormErrorComponent,
    RlsPickerDateComponent,
    RlsModalComponent
  ]
})
export class RlsFieldDateComponent implements OnChanges, OnDestroy {
  @Input()
  public formControl?: AngularControlEmpty<Date>;

  @Input()
  public minDate?: Date;

  @Input()
  public maxDate?: Date;

  @Input()
  public label = true;

  @Input()
  public placeholder = '';

  @Input()
  public disabled = false;

  @Input()
  public format = '{dd}/{mx}/{aa}';

  @Output()
  public value: EventEmitter<Date | undefined>;

  private unsusbcription?: () => void;

  protected currentValue?: Date;

  protected inputValue = signal('');

  protected modalIsVisible = false;

  constructor() {
    this.value = new EventEmitter();
    this.currentValue = new Date();
    this.setFormatDate(this.currentValue);
  }

  public ngOnDestroy(): void {
    this.unsusbcription && this.unsusbcription();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const { formControl } = changes;

    if (formControl) {
      this.unsusbcription && this.unsusbcription();

      this.unsusbcription = formControl.currentValue?.subscribe(
        (value: Date | undefined) => {
          this.setFormatDate(value);
        }
      );
    }
  }

  public get disabledInput(): boolean {
    return this.formControl?.disabled ?? this.disabled;
  }

  public onInput(): void {
    this.modalIsVisible = true;
  }

  public onAction(): void {
    if (this.currentValue) {
      this.onChange(undefined);
      this.formControl?.setValue(undefined);
      this.formControl?.touch();
    } else {
      this.modalIsVisible = true;
    }
  }

  public onListener({ type, value }: PickerListener<Date>): void {
    if (type !== PickerListenerType.Cancel) {
      this.onChange(value);
    }

    this.formControl?.touch();
    this.modalIsVisible = false;
  }

  private setFormatDate(date?: Date): void {
    this.inputValue.set(date ? dateFormatTemplate(date, this.format) : '');
  }

  private onChange(value?: Date): void {
    this.currentValue = value;
    this.setFormatDate(value);

    this.value.emit(value);
  }
}
