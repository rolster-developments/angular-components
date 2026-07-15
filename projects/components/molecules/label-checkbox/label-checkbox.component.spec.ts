import { TestBed } from '@angular/core/testing';
import { formControl } from '@rolster/angular-forms';

import { RlsLabelCheckboxComponent } from './label-checkbox.component';

describe('RlsLabelCheckboxComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsLabelCheckboxComponent] })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsLabelCheckboxComponent);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.rls-label-checkbox')
    ).toBeTruthy();
  });

  it('should reflect the formControl value and state', () => {
    const control = formControl(false);
    const fixture = TestBed.createComponent(RlsLabelCheckboxComponent);
    fixture.componentRef.setInput('formControl', control);
    fixture.detectChanges();

    const checkbox: HTMLElement =
      fixture.nativeElement.querySelector('rls-checkbox');

    expect(
      checkbox.querySelector('.rls-checkbox')?.classList.contains('rls-checkbox--checked')
    ).toBeFalse();

    control.setValue(true);
    fixture.detectChanges();

    expect(
      checkbox.querySelector('.rls-checkbox')?.classList.contains('rls-checkbox--checked')
    ).toBeTrue();
  });

  it('should invoke control methods on user events', () => {
    const control = formControl(false);
    const fixture = TestBed.createComponent(RlsLabelCheckboxComponent);
    fixture.componentRef.setInput('formControl', control);
    fixture.detectChanges();

    const toggle: HTMLElement = fixture.nativeElement.querySelector(
      '.rls-label-checkbox__component'
    );

    toggle.click();
    fixture.detectChanges();

    expect(control.value()).toBeTrue();
  });
});
