import { TestBed } from '@angular/core/testing';
import { formControl } from '@rolster/angular-forms';

import { RlsPickerDayComponent } from './picker-day.component';

describe('RlsPickerDayComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsPickerDayComponent] })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsPickerDayComponent);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.rls-picker-day__content')
    ).toBeTruthy();
  });

  it('should reflect the formControl value as the focused day', () => {
    const control = formControl(15);
    const fixture = TestBed.createComponent(RlsPickerDayComponent);
    fixture.componentRef.setInput('formControl', control);
    fixture.componentRef.setInput('date', new Date(2024, 0, 1));
    fixture.componentRef.setInput('month', 0);
    fixture.componentRef.setInput('year', 2024);
    fixture.detectChanges();

    const focused: HTMLElement = fixture.nativeElement.querySelector(
      '.rls-picker-day__element--focused'
    );

    expect(focused.textContent).toContain('15');
  });

  it('should invoke control methods on user events', () => {
    const control = formControl(1);
    const fixture = TestBed.createComponent(RlsPickerDayComponent);
    fixture.componentRef.setInput('formControl', control);
    fixture.componentRef.setInput('date', new Date(2024, 0, 1));
    fixture.componentRef.setInput('month', 0);
    fixture.componentRef.setInput('year', 2024);
    fixture.detectChanges();

    const days: HTMLElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('.rls-picker-day__element')
    );

    const target = days.find((el) => el.textContent?.trim() === '20');

    target?.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(control.value()).toBe(20);
  });
});
