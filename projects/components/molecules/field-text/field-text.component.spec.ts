import { TestBed } from '@angular/core/testing';
import { formControl } from '@rolster/angular-forms';

import { RlsFieldTextComponent } from './field-text.component';

describe('RlsFieldTextComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsFieldTextComponent] })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsFieldTextComponent);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.rls-field-text')
    ).toBeTruthy();
  });

  it('should reflect the formControl value and state', () => {
    const control = formControl('inicial');
    const fixture = TestBed.createComponent(RlsFieldTextComponent);
    fixture.componentRef.setInput('formControl', control);
    fixture.detectChanges();

    const el: HTMLInputElement =
      fixture.nativeElement.querySelector('.rls-input__component');

    expect(el.value).toBe('inicial');

    control.disable();
    fixture.detectChanges();

    expect(
      fixture.nativeElement
        .querySelector('.rls-field-box')
        .classList.contains('rls-field-box--disabled')
    ).toBeTrue();
  });

  it('should invoke control methods on user events', () => {
    const control = formControl('');
    const fixture = TestBed.createComponent(RlsFieldTextComponent);
    fixture.componentRef.setInput('formControl', control);
    fixture.detectChanges();

    const el: HTMLInputElement =
      fixture.nativeElement.querySelector('.rls-input__component');

    el.value = 'abc';
    el.dispatchEvent(new Event('input'));

    expect(control.value()).toBe('abc');

    el.dispatchEvent(new Event('blur'));

    expect(control.touched()).toBeTrue();
  });
});
