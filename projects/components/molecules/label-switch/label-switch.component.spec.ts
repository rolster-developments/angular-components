import { TestBed } from '@angular/core/testing';
import { formControl } from '@rolster/angular-forms';

import { RlsLabelSwitchComponent } from './label-switch.component';

describe('RlsLabelSwitchComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsLabelSwitchComponent] })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsLabelSwitchComponent);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.rls-label-switch')
    ).toBeTruthy();
  });

  it('should reflect the formControl value and state', () => {
    const control = formControl(false);
    const fixture = TestBed.createComponent(RlsLabelSwitchComponent);
    fixture.componentRef.setInput('formControl', control);
    fixture.detectChanges();

    const switchEl: HTMLElement =
      fixture.nativeElement.querySelector('.rls-switch');

    expect(switchEl.classList.contains('rls-switch--checked')).toBeFalse();

    control.setValue(true);
    fixture.detectChanges();

    expect(switchEl.classList.contains('rls-switch--checked')).toBeTrue();
  });

  it('should invoke control methods on user events', () => {
    const control = formControl(false);
    const fixture = TestBed.createComponent(RlsLabelSwitchComponent);
    fixture.componentRef.setInput('formControl', control);
    fixture.detectChanges();

    const toggle: HTMLElement = fixture.nativeElement.querySelector(
      '.rls-label-switch__component'
    );

    toggle.click();
    fixture.detectChanges();

    expect(control.value()).toBeTrue();
  });
});
