import { TestBed } from '@angular/core/testing';
import { formControl } from '@rolster/angular-forms';
import { DateRange } from '@rolster/dates';

import { RlsPickerDayRangeComponent } from './picker-day-range.component';

describe('RlsPickerDayRangeComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsPickerDayRangeComponent] })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsPickerDayRangeComponent);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.rls-picker-day-range__content')
    ).toBeTruthy();
  });

  it('should render the days of the given month', () => {
    const fixture = TestBed.createComponent(RlsPickerDayRangeComponent);
    fixture.componentRef.setInput('date', new Date(2024, 0, 1));
    fixture.detectChanges();

    const days = fixture.nativeElement.querySelectorAll(
      '.rls-picker-day-range__element'
    );

    expect(days.length).toBeGreaterThan(0);
  });

  it('should invoke control methods on user events', () => {
    const control = formControl<DateRange>();
    const fixture = TestBed.createComponent(RlsPickerDayRangeComponent);
    fixture.componentRef.setInput('formControl', control);
    fixture.componentRef.setInput('date', new Date(2024, 0, 1));
    fixture.detectChanges();

    const days: HTMLElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('.rls-picker-day-range__element')
    );

    const target = days.find((el) => el.textContent?.trim() === '10');

    target?.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(control.value()).toBeTruthy();
  });
});
