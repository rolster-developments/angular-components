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
  createYearPicker,
  verifyYearPicker,
  YearPickerOptions,
  YearState
} from '@rolster/components';
import { RlsButtonActionComponent } from '../../atoms';

@Component({
  selector: 'rls-picker-year',
  standalone: true,
  templateUrl: 'picker-year.component.html',
  styleUrls: ['picker-year.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, RlsButtonActionComponent]
})
export class RlsPickerYearComponent {
  public formControl = input<AngularControl<number>>();

  public date = input(new Date());

  public minDate = input<Date>();

  public maxDate = input<Date>();

  public disabled = input(false);

  private localValue = signal(new Date().getFullYear());

  protected selectedYear = computed(
    () => this.formControl()?.value() ?? this.localValue()
  );

  private anchor = signal(new Date().getFullYear());

  private validationOptions = computed<YearPickerOptions>(() => ({
    date: this.date(),
    year: this.selectedYear() || this.date().getFullYear(),
    minDate: this.minDate(),
    maxDate: this.maxDate()
  }));

  private renderOptions = computed<YearPickerOptions>(() => ({
    date: this.date(),
    year: this.anchor() || this.selectedYear() || this.date().getFullYear(),
    minDate: this.minDate(),
    maxDate: this.maxDate()
  }));

  protected template = computed(() => createYearPicker(this.renderOptions()));

  constructor() {
    effect(() => {
      const year = this.selectedYear();

      untracked(() => this.anchor.set(year));
    });

    effect(() => {
      const year = verifyYearPicker(this.validationOptions());

      if (valueIsDefined(year)) {
        untracked(() => this.setValue(year));
      }
    });
  }

  public onSelect({ value }: YearState): void {
    if (value) {
      this.setValue(value);
    }
  }

  public onPrev(): void {
    this.anchor.set(this.anchor() - 8);
  }

  public onNext(): void {
    this.anchor.set(this.anchor() + 8);
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
