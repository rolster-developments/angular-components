import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { AngularControlEmpty } from '@rolster/angular-forms';
import { itIsDefined } from '@rolster/commons';
import {
  checkDateRange,
  PickerListener,
  PickerListenerType} from '@rolster/components';
import {
  assignMonthInDate,
  assignYearInDate,
  dateFormatTemplate,
  DateRange,
  MONTH_NAMES} from '@rolster/dates';

import { RlsButtonComponent, RlsIconComponent } from '../../atoms';
import {
  RlsPickerDayRangeComponent,
  RlsPickerMonthComponent,
  RlsPickerMonthTitleComponent,
  RlsPickerYearComponent
} from '../../molecules';
import { PickerDateRangeGroup } from './picker-date-range.controls';

const FORMAT_TITLE = '{dw}, {mx} {dd} de {aa}';

type Visibility = 'DAY' | 'MONTH' | 'YEAR';

@Component({
  selector: 'rls-picker-date-range',
  standalone: true,
  templateUrl: 'picker-date-range.component.html',
  styleUrls: ['picker-date-range.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    RlsButtonComponent,
    RlsIconComponent,
    RlsPickerDayRangeComponent,
    RlsPickerMonthComponent,
    RlsPickerMonthTitleComponent,
    RlsPickerYearComponent
  ]
})
export class RlsPickerDateRangeComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input()
  public formControl?: AngularControlEmpty<DateRange>;

  @Input()
  public minDate?: Date;

  @Input()
  public maxDate?: Date;

  @Input()
  public automatic = false;

  @Output()
  public listener: EventEmitter<PickerListener<DateRange>>;

  private unsubscriptions: (() => void)[] = [];

  private unsubscription?: () => void;

  private value: DateRange;

  protected date: Date;

  protected dateGroup: PickerDateRangeGroup;

  protected visibility: Visibility = 'DAY';

  constructor() {
    this.listener = new EventEmitter();
    this.date = new Date();

    this.value = DateRange.now();
    this.dateGroup = new PickerDateRangeGroup(this.value, this.date);
  }

  public ngOnInit(): void {
    this.unsubscriptions.push(
      this.dateGroup.year.subscribe((year) => {
        if (itIsDefined(year)) {
          this.date = assignYearInDate(this.date, year);
          this.visibility = 'DAY';
        }
      })
    );

    this.unsubscriptions.push(
      this.dateGroup.month.subscribe((month) => {
        if (itIsDefined(month)) {
          this.date = assignMonthInDate(this.date, month);
          this.visibility = 'DAY';
        }
      })
    );

    this.unsubscriptions.push(
      this.dateGroup.day.subscribe((range) => {
        this.value = range;
      })
    );

    this.dateGroup.setDate(
      checkDateRange({
        date: this.date,
        minDate: this.minDate,
        maxDate: this.maxDate
      })
    );
  }

  public ngOnDestroy(): void {
    this.unsubscriptions.forEach((unsubscription) => {
      unsubscription();
    });

    this.unsubscription && this.unsubscription();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const { formControl } = changes;

    if (formControl) {
      this.unsubscription && this.unsubscription();

      this.unsubscription = formControl.currentValue?.subscribe(
        (value: DateRange | undefined) => {
          if (value) {
            this.value = value;
          }
        }
      );
    }
  }

  public get title(): string {
    return dateFormatTemplate(this.date, FORMAT_TITLE);
  }

  public get year(): string {
    return this.date.getFullYear().toString();
  }

  public get month(): string {
    return MONTH_NAMES(this.date.getMonth());
  }

  public onVisibilityDay(): void {
    this.visibility = 'DAY';
  }

  public onVisibilityMonth(): void {
    this.visibility = 'MONTH';
  }

  public onVisibilityYear(): void {
    this.visibility = 'YEAR';
  }

  public onSelect(): void {
    this.emitDateRange(this.value);
  }

  public onCancel(): void {
    this.emitListener(PickerListenerType.Cancel);
  }

  private emitListener(type: PickerListenerType, value?: DateRange): void {
    this.listener.emit({ type, value });
  }

  private emitDateRange(value: DateRange): void {
    this.formControl?.setValue(value);
    this.emitListener(PickerListenerType.Select, value);
  }
}
