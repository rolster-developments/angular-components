import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { AngularControl } from '@rolster/angular-forms';
import { itIsDefined } from '@rolster/commons';
import { monthLimitTemplate } from '@rolster/components';
import { Month,MONTH_NAMES } from '@rolster/dates';

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
export class RlsPickerMonthTitleComponent implements OnDestroy, OnChanges {
  @Input()
  public monthControl?: AngularControl<number>;

  @Input()
  public yearControl?: AngularControl<number>;

  @Input()
  public date: Date;

  @Input()
  public minDate?: Date;

  @Input()
  public maxDate?: Date;

  @Input()
  public disabled = false;

  @Input()
  public type: PickerMonthTitleType = 'month';

  @Output()
  public title: EventEmitter<void>;

  private unsubscription?: () => void;

  protected name: string;

  protected limitPrevious = false;

  protected limitNext = false;

  constructor() {
    this.name = MONTH_NAMES()[new Date().getMonth()];

    this.date = new Date();
    this.title = new EventEmitter();
  }

  public ngOnDestroy(): void {
    this.unsubscription && this.unsubscription();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const { date, maxDate, minDate, monthControl } = changes;

    if (date || minDate || maxDate) {
      const { limitNext, limitPrevious } = monthLimitTemplate({
        date: this.date,
        maxDate: this.maxDate,
        minDate: this.minDate,
        month: this.monthControl?.value
      });

      this.limitNext = limitNext;
      this.limitPrevious = limitPrevious;
    }

    if (monthControl) {
      this.unsubscription && this.unsubscription();

      this.unsubscription = monthControl.currentValue?.subscribe(
        (value: number) => {
          this.name = MONTH_NAMES()[value ?? 0];

          const { limitNext, limitPrevious } = monthLimitTemplate({
            date: this.date,
            maxDate: this.maxDate,
            minDate: this.minDate,
            month: value
          });

          this.limitNext = limitNext;
          this.limitPrevious = limitPrevious;
        }
      );
    }
  }

  public onTitle(): void {
    this.title.emit();
  }

  public onPrevious(): void {
    this.type === 'month' ? this.onPreviousMonth() : this.onPreviousYear();
  }

  public onNext(): void {
    this.type === 'month' ? this.onNextMonth() : this.onNextYear();
  }

  private onPreviousMonth(): void {
    if (
      itIsDefined(this.monthControl?.value) &&
      itIsDefined(this.yearControl?.value)
    ) {
      if (this.monthControl.value > Month.January) {
        this.monthControl.setValue(this.monthControl.value - 1);
      } else {
        this.monthControl.setValue(Month.December);
        this.yearControl.setValue(this.yearControl.value - 1);
      }
    }
  }

  private onPreviousYear(): void {
    if (itIsDefined(this.yearControl?.value)) {
      this.yearControl.setValue(this.yearControl.value - 1);
    }
  }

  private onNextMonth(): void {
    if (
      itIsDefined(this.monthControl?.value) &&
      itIsDefined(this.yearControl?.value)
    ) {
      if (this.monthControl.value < Month.December) {
        this.monthControl.setValue(this.monthControl.value + 1);
      } else {
        this.monthControl.setValue(Month.January);
        this.yearControl.setValue(this.yearControl.value + 1);
      }
    }
  }

  private onNextYear(): void {
    if (itIsDefined(this.yearControl?.value)) {
      this.yearControl.setValue(this.yearControl.value + 1);
    }
  }
}
