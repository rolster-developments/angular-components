import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { AngularControlEmpty } from '@rolster/angular-forms';
import { itIsDefined } from '@rolster/commons';
import {
  checkDateRange,
  PickerListener,
  PickerListenerType} from '@rolster/components';
import {
  assignDayInDate,
  assignMonthInDate,
  assignYearInDate,
  dateFormatTemplate,
  MONTH_NAMES} from '@rolster/dates';

import { RlsButtonComponent, RlsIconComponent } from '../../atoms';
import {
  RlsPickerDayComponent,
  RlsPickerMonthComponent,
  RlsPickerMonthTitleComponent,
  RlsPickerYearComponent
} from '../../molecules';
import { PickerDateGroup } from './picker-date.controls';

const FORMAT_TITLE = '{dw}, {mx} {dd} de {aa}';

type Visibility = 'DAY' | 'MONTH' | 'YEAR';

@Component({
  selector: 'rls-picker-date',
  standalone: true,
  templateUrl: 'picker-date.component.html',
  styleUrls: ['picker-date.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    RlsButtonComponent,
    RlsIconComponent,
    RlsPickerDayComponent,
    RlsPickerMonthComponent,
    RlsPickerMonthTitleComponent,
    RlsPickerYearComponent
  ]
})
export class RlsPickerDateComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  public formControl?: AngularControlEmpty<Date>;

  @Input()
  public minDate?: Date;

  @Input()
  public maxDate?: Date;

  @Input()
  public automatic = false;

  @Output()
  public listener: EventEmitter<PickerListener<Date>>;

  private unsubscriptions: (() => void)[] = [];

  private unsubscription?: () => void;

  protected value: Date;

  protected dateGroup: PickerDateGroup;

  protected visibility: Visibility = 'DAY';

  constructor() {
    this.listener = new EventEmitter();
    this.value = new Date();
    this.dateGroup = new PickerDateGroup(this.value);
  }

  public ngOnInit(): void {
    this.unsubscriptions.push(
      this.dateGroup.year.subscribe((year) => {
        if (itIsDefined(year)) {
          this.value = assignYearInDate(this.value, year);
          this.visibility = 'DAY';
        }
      })
    );

    this.unsubscriptions.push(
      this.dateGroup.month.subscribe((month) => {
        if (itIsDefined(month)) {
          this.value = assignMonthInDate(this.value, month);
          this.visibility = 'DAY';
        }
      })
    );

    this.unsubscriptions.push(
      this.dateGroup.day.subscribe((day) => {
        if (itIsDefined(day)) {
          const newValue = assignDayInDate(this.value, day);
          this.value = newValue;

          if (this.automatic) {
            this.emitDate(newValue);
          }
        }
      })
    );

    this.dateGroup.setDate(
      checkDateRange({
        date: this.formControl?.value ?? this.value,
        minDate: this.minDate,
        maxDate: this.maxDate
      })
    );
  }

  public ngOnDestroy(): void {
    this.unsubscriptions.forEach((unsubscription) => {
      unsubscription();
    });

    this.unsubscription && this.unsubscription();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const { formControl } = changes;

    if (formControl) {
      this.unsubscription && this.unsubscription();

      this.unsubscription = formControl.currentValue?.subscribe(
        (value: Date | undefined) => {
          if (value) {
            this.value = value;
          }
        }
      );
    }
  }

  public get title(): string {
    return dateFormatTemplate(this.value, FORMAT_TITLE);
  }

  public get year(): string {
    return this.value.getFullYear().toString();
  }

  public get month(): string {
    return MONTH_NAMES(this.value.getMonth());
  }

  public onVisibilityDay(): void {
    this.visibility = 'DAY';
  }

  public onVisibilityMonth(): void {
    this.visibility = 'MONTH';
  }

  public onVisibilityYear(): void {
    this.visibility = 'YEAR';
  }

  public onSelect(): void {
    this.emitDate(this.value);
  }

  public onToday(): void {
    const today = new Date(); // Refresh value with Today

    this.dateGroup.setDate(today);
    this.formControl?.setValue(today);
    this.emitListener(PickerListenerType.Now, today);
  }

  public onCancel(): void {
    this.emitListener(PickerListenerType.Cancel);
  }

  private emitListener(type: PickerListenerType, value?: Date): void {
    this.listener.emit({ type, value });
  }

  private emitDate(value: Date): void {
    this.formControl?.setValue(value);
    this.emitListener(PickerListenerType.Select, value);
  }
}
