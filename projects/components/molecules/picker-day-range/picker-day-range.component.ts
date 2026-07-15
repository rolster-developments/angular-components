import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { AngularControl } from '@rolster/angular-forms';
import {
  createDayRangePicker,
  DayRangePickerProps,
  DayRangeState,
  WeekRangeState} from '@rolster/components';
import {
  assignDayInDate,
  dateIsBefore,
  DateRange,
  DAY_LABELS,
  normalizeMinTime
} from '@rolster/dates';

@Component({
  selector: 'rls-picker-day-range',
  standalone: true,
  templateUrl: 'picker-day-range.component.html',
  styleUrls: ['picker-day-range.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule]
})
export class RlsPickerDayRangeComponent {
  @Input()
  public formControl?: AngularControl<DateRange>;

  @Input()
  public date?: Date;

  @Input()
  public minDate?: Date;

  @Input()
  public maxDate?: Date;

  @Input()
  public disabled = false;

  private currentRange: DateRange;

  private sourceDate: Date;

  protected titles = DAY_LABELS();

  protected weeks: WeekRangeState[] = [];

  constructor() {
    this.currentRange = DateRange.now();
    this.sourceDate = this.currentRange.minDate;
  }

  public ngOnInit(): void {
    this.renderComponent({
      date: this.currentDate,
      range: this.currentRange,
      sourceDate: this.sourceDate,
      maxDate: this.maxDate,
      minDate: this.minDate
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const { date, maxDate, minDate } = changes;

    if (date || minDate || maxDate) {
      this.renderComponent({
        date: date?.currentValue || this.currentDate,
        range: this.currentRange,
        sourceDate: this.sourceDate,
        maxDate: maxDate?.currentValue || this.maxDate,
        minDate: minDate?.currentValue || this.minDate
      });
    }
  }

  private get currentDate(): Date {
    return normalizeMinTime(this.date || this.currentRange.minDate);
  }

  public onSelect({ value }: DayRangeState): void {
    if (value) {
      const date = assignDayInDate(this.currentDate, value);

      const range = dateIsBefore(date, this.sourceDate)
        ? new DateRange(this.sourceDate, date)
        : new DateRange(date, this.sourceDate);

      this.sourceDate = date;
      this.currentRange = range;
      this.formControl?.setValue(range);

      this.renderComponent({
        date,
        range,
        sourceDate: this.sourceDate,
        maxDate: this.maxDate,
        minDate: this.minDate
      });
    }
  }

  private renderComponent(props: DayRangePickerProps): void {
    this.weeks = createDayRangePicker(props);
  }
}
