import { TestBed } from '@angular/core/testing';
import { formControl } from '@rolster/angular-forms';

import { RlsPickerMonthComponent } from './picker-month.component';

describe('RlsPickerMonthComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsPickerMonthComponent] })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsPickerMonthComponent);
    fixture.detectChanges();

    const months = fixture.nativeElement.querySelectorAll(
      '.rls-picker-month__component'
    );

    expect(months.length).toBe(12);
  });

  it('should reflect the formControl value as the focused month', () => {
    const control = formControl(5);
    const fixture = TestBed.createComponent(RlsPickerMonthComponent);
    fixture.componentRef.setInput('formControl', control);
    fixture.detectChanges();

    const months: HTMLElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('.rls-picker-month__component')
    );

    expect(
      months[5].classList.contains('rls-picker-month__component--focused')
    ).toBeTrue();
  });

  it('should invoke control methods on user events', () => {
    const control = formControl(0);
    const fixture = TestBed.createComponent(RlsPickerMonthComponent);
    fixture.componentRef.setInput('formControl', control);
    fixture.detectChanges();

    const months: HTMLElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('.rls-picker-month__component')
    );

    months[3].dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(control.value()).toBe(3);
  });
});
