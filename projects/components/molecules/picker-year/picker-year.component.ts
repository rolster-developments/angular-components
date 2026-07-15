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
  checkYearPicker,
  createYearPicker,
  YearPickerProps,
  YearPickerTemplate,
  YearState} from '@rolster/components';

import { RlsButtonActionComponent } from '../../atoms';

@Component({
  selector: 'rls-picker-year',
  standalone: true,
  templateUrl: 'picker-year.component.html',
  styleUrls: ['picker-year.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, RlsButtonActionComponent]
})
export class RlsPickerYearComponent implements OnInit, OnDestroy, OnChanges {
  @Input()
  public formControl?: AngularControl<number>;

  @Input()
  public date: Date;

  @Input()
  public minDate?: Date;

  @Input()
  public maxDate?: Date;

  @Input()
  public disabled = false;

  private unsubscription?: () => void;

  private value: number;

  private year: number;

  protected template: YearPickerTemplate;

  constructor() {
    this.date = new Date();

    this.value = this.date.getFullYear();
    this.year = this.value;

    this.template = createYearPicker(this.createPickerProps());
  }

  public ngOnInit(): void {
    this.renderComponent(this.createPickerProps());
  }

  public ngOnDestroy(): void {
    this.unsubscription && this.unsubscription();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const { date, formControl, maxDate, minDate } = changes;

    if (date || minDate || maxDate) {
      const props = this.createPickerProps();
      const year = checkYearPicker(props);

      if (year) {
        if (this.formControl) {
          this.formControl.setValue(year);
        } else {
          this.year = year;
          this.value = year;
        }
      } else {
        this.renderComponent(props);
      }
    }

    if (formControl) {
      this.unsubscription && this.unsubscription();

      this.unsubscription = formControl.currentValue?.subscribe(
        (year: number) => {
          this.setValue(year ?? this.date.getFullYear());
        }
      );
    }
  }

  public onSelect({ value }: YearState): void {
    if (value) {
      this.formControl?.setValue(value);
    }
  }

  public onPrev(): void {
    this.year = this.year - 8; // Disminuyendo rango
    this.renderComponent(this.createPickerProps(this.year));
  }

  public onNext(): void {
    this.year = this.year + 8; // Incrementando rango
    this.renderComponent(this.createPickerProps(this.year));
  }

  private createPickerProps(year?: number): YearPickerProps {
    return {
      date: this.date,
      year: year || this.value || this.date.getFullYear(),
      minDate: this.minDate,
      maxDate: this.maxDate
    };
  }

  private setValue(value: number): void {
    const props = this.createPickerProps(value);
    const year = checkYearPicker(props);

    if (itIsDefined(year)) {
      this.formControl?.setValue(year);
    } else {
      this.value = value;
      this.year = value;
      this.renderComponent(props);
    }
  }

  private renderComponent(props: YearPickerProps): void {
    this.template = createYearPicker(props);
  }
}
