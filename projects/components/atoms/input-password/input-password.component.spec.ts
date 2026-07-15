import { TestBed } from '@angular/core/testing';
import { formControl } from '@rolster/angular-forms';

import { RlsInputPasswordComponent } from './input-password.component';

describe('RlsInputPasswordComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsInputPasswordComponent] })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsInputPasswordComponent);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.rls-input-password')
    ).toBeTruthy();
  });

  it('should reflect the formControl value and state', () => {
    const control = formControl('inicial');
    const fixture = TestBed.createComponent(RlsInputPasswordComponent);
    fixture.componentRef.setInput('formControl', control);
    fixture.detectChanges();

    const el: HTMLInputElement = fixture.nativeElement.querySelector(
      '.rls-input-password__component'
    );

    expect(el.value).toBe('inicial');

    control.setValue('cambiado');
    fixture.detectChanges();

    expect(el.value).toBe('cambiado');

    control.disable();
    fixture.detectChanges();

    expect(el.disabled).toBeTrue();
  });

  it('should invoke control methods on user events', () => {
    const control = formControl('');
    const fixture = TestBed.createComponent(RlsInputPasswordComponent);
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
  });
});
