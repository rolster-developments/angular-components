import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  input,
  output,
  ViewEncapsulation
} from '@angular/core';
import { AngularControl } from '@rolster/angular-forms';
import { valueIsDefined } from '@rolster/commons';
import { monthLimitTemplate } from '@rolster/components';
import { Month, MONTH_NAMES } from '@rolster/dates';
import { RlsButtonActionComponent } from '../../atoms';

type PickerMonthTitleType = 'month' | 'year';

@Component({
  selector: 'rls-picker-month-title',
  standalone: true,
  templateUrl: 'picker-month-title.component.html',
  styleUrls: ['picker-month-title.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, RlsButtonActionComponent]
})
export class RlsPickerMonthTitleComponent {
  public monthControl = input<AngularControl<number>>();

  public yearControl = input<AngularControl<number>>();

  public date = input(new Date());

  public minDate = input<Date>();

  public maxDate = input<Date>();

  public disabled = input(false);

  public type = input<PickerMonthTitleType>('month');

  public title = output<void>();

  protected name = computed(
    () => MONTH_NAMES()[this.monthControl()?.value() ?? this.date().getMonth()]
  );

  private limitTemplate = computed(() =>
    monthLimitTemplate({
      date: this.date(),
      maxDate: this.maxDate(),
      minDate: this.minDate(),
      month: this.monthControl()?.value()
    })
  );

  protected limitPrevious = computed(() => this.limitTemplate().limitPrevious);

  protected limitNext = computed(() => this.limitTemplate().limitNext);

  public onTitle(): void {
    this.title.emit();
  }

  public onPrevious(): void {
    this.type() === 'month' ? this.onPreviousMonth() : this.onPreviousYear();
  }

  public onNext(): void {
    this.type() === 'month' ? this.onNextMonth() : this.onNextYear();
  }

  private onPreviousMonth(): void {
    const monthControl = this.monthControl();
    const yearControl = this.yearControl();
    const month = monthControl?.value();
    const year = yearControl?.value();

    if (monthControl && yearControl && valueIsDefined(month) && valueIsDefined(year)) {
      if (month > Month.January) {
        monthControl.setValue(month - 1);
      } else {
        monthControl.setValue(Month.December);
        yearControl.setValue(year - 1);
      }
    }
  }

  private onPreviousYear(): void {
    const yearControl = this.yearControl();
    const year = yearControl?.value();

    if (yearControl && valueIsDefined(year)) {
      yearControl.setValue(year - 1);
    }
  }

  private onNextMonth(): void {
    const monthControl = this.monthControl();
    const yearControl = this.yearControl();
    const month = monthControl?.value();
    const year = yearControl?.value();

    if (monthControl && yearControl && valueIsDefined(month) && valueIsDefined(year)) {
      if (month < Month.December) {
        monthControl.setValue(month + 1);
      } else {
        monthControl.setValue(Month.January);
        yearControl.setValue(year + 1);
      }
    }
  }

  private onNextYear(): void {
    const yearControl = this.yearControl();
    const year = yearControl?.value();

    if (yearControl && valueIsDefined(year)) {
      yearControl.setValue(year + 1);
    }
  }
}
