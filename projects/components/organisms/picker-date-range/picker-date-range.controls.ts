import {
  AngularControl,
  formControl,
  FormControls,
  FormGroup} from '@rolster/angular-forms';
import { DateRange } from '@rolster/dates';

interface PickerDateRangeControls extends FormControls {
  day: AngularControl<DateRange>;
  month: AngularControl<number>;
  year: AngularControl<number>;
}

export class PickerDateRangeGroup extends FormGroup<PickerDateRangeControls> {
  public readonly day: AngularControl<DateRange>;

  public readonly month: AngularControl<number>;

  public readonly year: AngularControl<number>;

  constructor(range: DateRange, date: Date) {
    const year = formControl(date.getFullYear());
    const month = formControl(date.getMonth());
    const day = formControl(range);

    super({
      controls: { day, month, year }
    });

    this.day = day;
    this.month = month;
    this.year = year;
  }

  public setDate(date: Date): void {
    this.year.setValue(date.getFullYear());
    this.month.setValue(date.getMonth());
  }
}
