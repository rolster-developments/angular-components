import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  input,
  signal,
  untracked,
  ViewEncapsulation
} from '@angular/core';
import { AngularControl } from '@rolster/angular-forms';
import { valueIsDefined } from '@rolster/commons';
import {
  createDayPicker,
  DayPickerOptions,
  DayState,
  verifyDayPicker
} from '@rolster/components';
import { DAY_LABELS } from '@rolster/dates';

@Component({
  selector: 'rls-picker-day',
  standalone: true,
  templateUrl: 'picker-day.component.html',
  styleUrls: ['picker-day.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule]
})
export class RlsPickerDayComponent {
  public formControl = input<AngularControl<number>>();

  public date = input(new Date());

  public month = input<number>();

  public year = input<number>();

  public minDate = input<Date>();

  public maxDate = input<Date>();

  protected titles = DAY_LABELS();

  private localValue = signal(new Date().getDate());

  protected day = computed(
    () => this.formControl()?.value() ?? this.localValue()
  );

  private options = computed<DayPickerOptions>(() => ({
    date: this.date(),
    day: this.day(),
    month: valueIsDefined(this.month()) ? this.month()! : this.date().getMonth(),
    year: this.year() ?? this.date().getFullYear(),
    maxDate: this.maxDate(),
    minDate: this.minDate()
  }));

  protected weeks = computed(() => createDayPicker(this.options()));

  constructor() {
    effect(() => {
      const day = verifyDayPicker(this.options());

      if (day) {
        untracked(() => this.setValue(day));
      }
    });
  }

  public onSelect({ value }: DayState): void {
    if (value) {
      this.setValue(value);
    }
  }

  private setValue(value: number): void {
    const control = this.formControl();

    if (control) {
      control.setValue(value);
    } else {
      this.localValue.set(value);
    }
  }
}
