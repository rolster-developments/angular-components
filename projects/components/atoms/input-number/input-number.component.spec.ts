import { TestBed } from '@angular/core/testing';
import { formControl } from '@rolster/angular-forms';

import { RlsInputNumberComponent } from './input-number.component';

describe('RlsInputNumberComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsInputNumberComponent] })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsInputNumberComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.rls-input')).toBeTruthy();
  });

  it('should reflect the formControl value and state', () => {
    const control = formControl(10);
    const fixture = TestBed.createComponent(RlsInputNumberComponent);
    fixture.componentRef.setInput('formControl', control);
    fixture.detectChanges();

    const el: HTMLInputElement =
      fixture.nativeElement.querySelector('.rls-input__component');

    expect(el.value).toBe('10');

    control.setValue(20);
    fixture.detectChanges();

    expect(el.value).toBe('20');

    control.disable();
    fixture.detectChanges();

    expect(el.disabled).toBeTrue();
  });

  it('should invoke control methods on user events', () => {
    const control = formControl(0);
    const fixture = TestBed.createComponent(RlsInputNumberComponent);
    fixture.componentRef.setInput('formControl', control);
    fixture.detectChanges();

    const el: HTMLInputElement =
      fixture.nativeElement.querySelector('.rls-input__component');

    el.value = '7';
    el.dispatchEvent(new Event('input'));

    expect(control.value()).toBe(7);

    el.dispatchEvent(new Event('blur'));

    expect(control.touched()).toBeTrue();
  });
});
