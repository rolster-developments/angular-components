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
import { dateFormatTemplate,DateRange } from '@rolster/dates';

import { RlsButtonActionComponent } from '../../atoms';
import { RlsMessageFormErrorComponent } from '../../molecules';
import { RlsModalComponent } from '../modal/modal.component';
import { RlsPickerDateRangeComponent } from '../picker-date-range/picker-date-range.component';

const DATE_RANGE_FORMAT = '{dd}/{mx}/{aa}';

function rangeFormatTemplate({ maxDate, minDate }: DateRange): string {
  const minFormat = dateFormatTemplate(minDate, DATE_RANGE_FORMAT);
  const maxFormat = dateFormatTemplate(maxDate, DATE_RANGE_FORMAT);

  return `${minFormat} - ${maxFormat}`;
}

@Component({
  selector: 'rls-field-date-range',
  standalone: true,
  templateUrl: 'field-date-range.component.html',
  styleUrls: ['field-date-range.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    RlsButtonActionComponent,
    RlsMessageFormErrorComponent,
    RlsPickerDateRangeComponent,
    RlsModalComponent
  ]
})
export class RlsFieldDateRangeComponent implements OnChanges, OnDestroy {
  @Input()
  public formControl?: AngularControlEmpty<DateRange>;

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

  @Output()
  public value: EventEmitter<DateRange | undefined>;

  private unsusbcription?: () => void;

  protected currentValue?: DateRange;

  protected inputValue = signal('');

  protected modalIsVisible = false;

  constructor() {
    this.value = new EventEmitter();
    this.currentValue = DateRange.now();
    this.setFormatRange(this.currentValue);
  }

  public ngOnDestroy(): void {
    this.unsusbcription && this.unsusbcription();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const { formControl } = changes;

    if (formControl) {
      this.unsusbcription && this.unsusbcription();

      this.unsusbcription = formControl.currentValue?.subscribe(
        (value: DateRange | undefined) => {
          this.setFormatRange(value);
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

  public onListener({ type, value }: PickerListener<DateRange>): void {
    if (type !== PickerListenerType.Cancel) {
      this.onChange(value);
    }

    this.formControl?.touch();
    this.modalIsVisible = false;
  }

  private setFormatRange(range?: DateRange): void {
    this.inputValue.set(range ? rangeFormatTemplate(range) : '');
  }

  private onChange(value?: DateRange): void {
    this.currentValue = value;
    this.setFormatRange(value);

    this.value.emit(value);
  }
}
