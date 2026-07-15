import { TestBed } from '@angular/core/testing';
import { formControl } from '@rolster/angular-forms';

import { RlsFieldPasswordComponent } from './field-password.component';

describe('RlsFieldPasswordComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsFieldPasswordComponent] })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsFieldPasswordComponent);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.rls-field-password')
    ).toBeTruthy();
  });

  it('should reflect the formControl value and state', () => {
    const control = formControl('secret');
    const fixture = TestBed.createComponent(RlsFieldPasswordComponent);
    fixture.componentRef.setInput('formControl', control);
    fixture.detectChanges();

    const el: HTMLInputElement = fixture.nativeElement.querySelector(
      '.rls-input-password__component'
    );

    expect(el.value).toBe('secret');
    expect(el.type).toBe('password');

    control.disable();
    fixture.detectChanges();

    expect(
      fixture.nativeElement
        .querySelector('.rls-field-box')
        .classList.contains('rls-field-box--disabled')
    ).toBeTrue();
  });

  it('should invoke control methods on user events and toggle visibility', () => {
    const control = formControl('');
    const fixture = TestBed.createComponent(RlsFieldPasswordComponent);
    fixture.componentRef.setInput('formControl', control);
    fixture.detectChanges();

    const el: HTMLInputElement = fixture.nativeElement.querySelector(
      '.rls-input-password__component'
    );

    el.value = 'abc';
    el.dispatchEvent(new Event('input'));

    expect(control.value()).toBe('abc');

    el.dispatchEvent(new Event('blur'));

    expect(control.touched()).toBeTrue();

    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');

    button.click();
    fixture.detectChanges();

    expect(el.type).toBe('text');
  });
});
