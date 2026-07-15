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
import {
  checkMonthPicker,
  createMonthPicker,
  MonthPickerProps,
  MonthState} from '@rolster/components';

@Component({
  selector: 'rls-picker-month',
  standalone: true,
  templateUrl: 'picker-month.component.html',
  styleUrls: ['picker-month.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule]
})
export class RlsPickerMonthComponent implements OnInit, OnDestroy, OnChanges {
  @Input()
  public formControl?: AngularControl<number>;

  @Input()
  public date: Date;

  @Input()
  public year?: number;

  @Input()
  public minDate?: Date;

  @Input()
  public maxDate?: Date;

  @Input()
  public disabled = false;

  private unsubscription?: () => void;

  private value: number;

  protected months: MonthState[] = [];

  constructor() {
    this.date = new Date();
    this.year = this.date.getFullYear();
    this.value = this.date.getMonth();
  }

  public ngOnInit(): void {
    this.renderComponent(this.createPickerProps());
  }

  public ngOnDestroy(): void {
    this.unsubscription && this.unsubscription();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const { date, formControl, maxDate, minDate, year } = changes;

    if (date || minDate || maxDate || year) {
      const props = this.createPickerProps();
      const month = checkMonthPicker(props);

      if (month) {
        this.formControl
          ? this.formControl.setValue(month)
          : (this.value = month);
      } else {
        this.renderComponent(props);
      }
    }

    if (formControl) {
      this.unsubscription && this.unsubscription();

      this.unsubscription = formControl.currentValue?.subscribe(
        (value: number) => {
          this.setValue(value ?? this.date.getMonth());
        }
      );
    }
  }

  public onSelect({ value }: MonthState): void {
    this.formControl?.setValue(value);
  }

  private createPickerProps(): MonthPickerProps {
    return {
      date: this.date,
      month: this.formControl?.value ?? this.value,
      year: this.year || this.date.getFullYear(),
      minDate: this.minDate,
      maxDate: this.maxDate
    };
  }

  private setValue(value: number): void {
    const props = this.createPickerProps();
    const month = checkMonthPicker(props);

    if (month) {
      this.formControl?.setValue(month);
    } else {
      this.value = value;
      this.renderComponent(props);
    }
  }

  private renderComponent(props: MonthPickerProps): void {
    this.months = createMonthPicker(props);
  }
}
