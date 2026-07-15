import { TestBed } from '@angular/core/testing';
import { formControl } from '@rolster/angular-forms';

import { RlsPickerMonthTitleComponent } from './picker-month-title.component';

describe('RlsPickerMonthTitleComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RlsPickerMonthTitleComponent]
    })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsPickerMonthTitleComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('span')).toBeTruthy();
  });

  it('should reflect the monthControl value as the title', () => {
    const monthControl = formControl(0);
    const fixture = TestBed.createComponent(RlsPickerMonthTitleComponent);
    fixture.componentRef.setInput('monthControl', monthControl);
    fixture.detectChanges();

    const span: HTMLElement = fixture.nativeElement.querySelector('span');

    expect(span.textContent?.trim().length).toBeGreaterThan(0);

    const initialName = span.textContent;

    monthControl.setValue(1);
    fixture.detectChanges();

    expect(span.textContent).not.toBe(initialName);
  });

  it('should invoke control methods on user events', () => {
    const monthControl = formControl(0);
    const yearControl = formControl(2024);
    const fixture = TestBed.createComponent(RlsPickerMonthTitleComponent);
    fixture.componentRef.setInput('monthControl', monthControl);
    fixture.componentRef.setInput('yearControl', yearControl);
    fixture.detectChanges();

    const buttons: HTMLButtonElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('button')
    );

    buttons[0].click();
    fixture.detectChanges();

    expect(monthControl.value()).toBe(11);
    expect(yearControl.value()).toBe(2023);

    const span: HTMLElement = fixture.nativeElement.querySelector('span');
    span.dispatchEvent(new Event('click'));
  });
});
