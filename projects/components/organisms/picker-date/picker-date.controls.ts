import {
  AngularControl,
  formControl,
  FormControls,
  FormGroup} from '@rolster/angular-forms';

interface PickerDateControls extends FormControls {
  day: AngularControl<number>;
  month: AngularControl<number>;
  year: AngularControl<number>;
}

export class PickerDateGroup extends FormGroup<PickerDateControls> {
  public readonly day: AngularControl<number>;

  public readonly month: AngularControl<number>;

  public readonly year: AngularControl<number>;

  constructor(date: Date) {
    const year = formControl(date.getFullYear());
    const month = formControl(date.getMonth());
    const day = formControl(date.getDate());

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
    this.day.setValue(date.getDate());
  }
}
