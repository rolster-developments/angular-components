import { TestBed } from '@angular/core/testing';
import { formControl } from '@rolster/angular-forms';

import { RlsFieldNumberComponent } from './field-number.component';

describe('RlsFieldNumberComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsFieldNumberComponent] })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsFieldNumberComponent);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.rls-field-number')
    ).toBeTruthy();
  });

  it('should reflect the formControl value and state', () => {
    const control = formControl(5);
    const fixture = TestBed.createComponent(RlsFieldNumberComponent);
    fixture.componentRef.setInput('formControl', control);
    fixture.detectChanges();

    const el: HTMLInputElement =
      fixture.nativeElement.querySelector('.rls-input__component');

    expect(el.value).toBe('5');

    control.disable();
    fixture.detectChanges();

    expect(
      fixture.nativeElement
        .querySelector('.rls-field-box')
        .classList.contains('rls-field-box--disabled')
    ).toBeTrue();
  });

  it('should invoke control methods on user events', () => {
    const control = formControl(0);
    const fixture = TestBed.createComponent(RlsFieldNumberComponent);
    fixture.componentRef.setInput('formControl', control);
    fixture.detectChanges();

    const el: HTMLInputElement =
      fixture.nativeElement.querySelector('.rls-input__component');

    el.value = '42';
    el.dispatchEvent(new Event('input'));

    expect(control.value()).toBe(42);

    el.dispatchEvent(new Event('blur'));

    expect(control.touched()).toBeTrue();
  });
});
