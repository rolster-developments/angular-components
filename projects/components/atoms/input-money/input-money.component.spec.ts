import { TestBed } from '@angular/core/testing';
import { formControl } from '@rolster/angular-forms';

import { RlsInputMoneyComponent } from './input-money.component';

describe('RlsInputMoneyComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsInputMoneyComponent] })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsInputMoneyComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.rls-input')).toBeTruthy();
  });

  it('should reflect the formControl value and state', () => {
    const control = formControl(100);
    const fixture = TestBed.createComponent(RlsInputMoneyComponent);
    fixture.componentRef.setInput('formControl', control);
    fixture.detectChanges();

    const el: HTMLInputElement =
      fixture.nativeElement.querySelector('.rls-input__component');

    expect(el.value).toBe('100');

    control.setValue(250);
    fixture.detectChanges();

    expect(el.value).toBe('250');

    control.disable();
    fixture.detectChanges();

    expect(el.disabled).toBeTrue();
  });

  it('should invoke control methods on user events', () => {
    const control = formControl(0);
    const fixture = TestBed.createComponent(RlsInputMoneyComponent);
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
