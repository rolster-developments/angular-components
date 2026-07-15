import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  input,
  signal,
  ViewEncapsulation
} from '@angular/core';
import { AngularControl } from '@rolster/angular-forms';
import { createDayRangePicker, DayRangeState } from '@rolster/components';
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
  public formControl = input<AngularControl<DateRange>>();

  public date = input<Date>();

  public minDate = input<Date>();

  public maxDate = input<Date>();

  public disabled = input(false);

  protected titles = DAY_LABELS();

  private currentRange = signal(DateRange.now());

  private sourceDate = signal(this.currentRange().minDate);

  private currentDate = computed(() =>
    normalizeMinTime(this.date() || this.currentRange().minDate)
  );

  protected weeks = computed(() =>
    createDayRangePicker({
      date: this.currentDate(),
      range: this.currentRange(),
      sourceDate: this.sourceDate(),
      maxDate: this.maxDate(),
      minDate: this.minDate()
    })
  );

  public onSelect({ value }: DayRangeState): void {
    if (value) {
      const date = assignDayInDate(this.currentDate(), value);
      const source = this.sourceDate();

      const range = dateIsBefore(date, source)
        ? new DateRange(source, date)
        : new DateRange(date, source);

      this.sourceDate.set(date);
      this.currentRange.set(range);
      this.formControl()?.setValue(range);
    }
  }
}
