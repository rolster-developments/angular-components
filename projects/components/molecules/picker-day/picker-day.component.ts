import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { AngularControl } from '@rolster/angular-forms';
import { itIsDefined } from '@rolster/commons';
import {
  checkDayPicker,
  createDayPicker,
  DayPickerProps,
  DayState,
  WeekState} from '@rolster/components';
import { DAY_LABELS } from '@rolster/dates';

@Component({
  selector: 'rls-picker-day',
  standalone: true,
  templateUrl: 'picker-day.component.html',
  styleUrls: ['picker-day.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule]
})
export class RlsPickerDayComponent implements OnInit, OnDestroy, OnChanges {
  @Input()
  public formControl?: AngularControl<number>;

  @Input()
  public date: Date;

  @Input()
  public month?: number;

  @Input()
  public year?: number;

  @Input()
  public minDate?: Date;

  @Input()
  public maxDate?: Date;

  private unsubscription?: () => void;

  private value: number;

  protected titles = DAY_LABELS();

  protected weeks: WeekState[] = [];

  constructor() {
    this.date = new Date();
    this.month = this.date.getMonth();
    this.year = this.date.getFullYear();
    this.value = this.date.getDate();
  }

  public ngOnInit(): void {
    this.renderComponent(this.createPickerProps());
  }

  public ngOnDestroy(): void {
    this.unsubscription && this.unsubscription();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const { date, formControl, maxDate, minDate, month, year } = changes;

    if (date || minDate || maxDate || month || year) {
      const props = this.createPickerProps();
      const day = checkDayPicker(props);

      if (day) {
        this.formControl ? this.formControl.setValue(day) : (this.value = day);
      } else {
        this.renderComponent(props);
      }
    }

    if (formControl) {
      this.unsubscription && this.unsubscription();

      this.unsubscription = formControl.currentValue?.subscribe(
        (value: number) => {
          this.setValue(value ?? this.date.getDate());
        }
      );
    }
  }

  public onSelect({ value }: DayState): void {
    if (value) {
      this.formControl?.setValue(value);
    }
  }

  private createPickerProps(): DayPickerProps {
    return {
      date: this.date,
      day: this.formControl?.value || this.value,
      month: itIsDefined(this.month) ? this.month : this.date.getMonth(),
      year: this.year || this.date.getFullYear(),
      maxDate: this.maxDate,
      minDate: this.minDate
    };
  }

  private setValue(value: number): void {
    const props = this.createPickerProps();
    const day = checkDayPicker(props);

    if (day) {
      this.formControl?.setValue(day);
    } else {
      this.value = value;
      this.renderComponent(props);
    }
  }

  private renderComponent(props: DayPickerProps): void {
    this.weeks = createDayPicker(props);
  }
}
