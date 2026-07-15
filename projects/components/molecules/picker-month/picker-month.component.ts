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
import {
  createMonthPicker,
  MonthPickerOptions,
  MonthState,
  verifyMonthPicker
} from '@rolster/components';

@Component({
  selector: 'rls-picker-month',
  standalone: true,
  templateUrl: 'picker-month.component.html',
  styleUrls: ['picker-month.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule]
})
export class RlsPickerMonthComponent {
  public formControl = input<AngularControl<number>>();

  public date = input(new Date());

  public year = input<number>();

  public minDate = input<Date>();

  public maxDate = input<Date>();

  public disabled = input(false);

  private localValue = signal(new Date().getMonth());

  protected month = computed(
    () => this.formControl()?.value() ?? this.localValue()
  );

  private options = computed<MonthPickerOptions>(() => ({
    date: this.date(),
    month: this.month(),
    year: this.year() || this.date().getFullYear(),
    minDate: this.minDate(),
    maxDate: this.maxDate()
  }));

  protected months = computed(() => createMonthPicker(this.options()));

  constructor() {
    effect(() => {
      const month = verifyMonthPicker(this.options());

      if (month) {
        untracked(() => this.setValue(month));
      }
    });
  }

  public onSelect({ value }: MonthState): void {
    this.setValue(value);
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
