import { TestBed } from '@angular/core/testing';
import { formControl } from '@rolster/angular-forms';

import { RlsFieldMoneyComponent } from './field-money.component';

describe('RlsFieldMoneyComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsFieldMoneyComponent] })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsFieldMoneyComponent);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.rls-field-money')
    ).toBeTruthy();
  });

  it('should reflect the formControl value and state', () => {
    const control = formControl(100);
    const fixture = TestBed.createComponent(RlsFieldMoneyComponent);
    fixture.componentRef.setInput('formControl', control);
    fixture.detectChanges();

    const el: HTMLInputElement =
      fixture.nativeElement.querySelector('.rls-input__component');

    expect(el.value).toContain('100');

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
    const fixture = TestBed.createComponent(RlsFieldMoneyComponent);
    fixture.componentRef.setInput('formControl', control);
    fixture.detectChanges();

    const el: HTMLInputElement =
      fixture.nativeElement.querySelector('.rls-input__component');

    el.value = '50';
    el.dispatchEvent(new Event('input'));

    expect(control.value()).toBe(50);

    el.dispatchEvent(new Event('blur'));

    expect(control.touched()).toBeTrue();
  });
});
