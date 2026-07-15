import { TestBed } from '@angular/core/testing';
import { formControl } from '@rolster/angular-forms';

import { RlsPickerYearComponent } from './picker-year.component';

describe('RlsPickerYearComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsPickerYearComponent] })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsPickerYearComponent);
    fixture.detectChanges();

    const years = fixture.nativeElement.querySelectorAll(
      '.rls-picker-year__year'
    );

    expect(years.length).toBe(9);
  });

  it('should reflect the formControl value as the focused year', () => {
    const control = formControl(2024);
    const fixture = TestBed.createComponent(RlsPickerYearComponent);
    fixture.componentRef.setInput('formControl', control);
    fixture.detectChanges();

    const focused: HTMLElement = fixture.nativeElement.querySelector(
      '.rls-picker-year__year--focused'
    );

    expect(focused.textContent).toContain('2024');
  });

  it('should invoke control methods on user events', () => {
    const control = formControl(2024);
    const fixture = TestBed.createComponent(RlsPickerYearComponent);
    fixture.componentRef.setInput('formControl', control);
    fixture.detectChanges();

    const years: HTMLElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('.rls-picker-year__year')
    );

    const target = years.find((el) => el.textContent?.trim() === '2025');

    target?.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(control.value()).toBe(2025);
  });

  it('should navigate the visible range with prev and next actions', () => {
    const fixture = TestBed.createComponent(RlsPickerYearComponent);
    fixture.detectChanges();

    const nextButton: HTMLButtonElement =
      fixture.nativeElement.querySelectorAll('button')[1];

    const before = fixture.nativeElement.textContent;

    nextButton.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).not.toBe(before);
  });
});
