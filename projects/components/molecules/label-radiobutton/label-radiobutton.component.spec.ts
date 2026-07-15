import { TestBed } from '@angular/core/testing';
import { formControl } from '@rolster/angular-forms';

import { RlsLabelRadiobuttonComponent } from './label-radiobutton.component';

describe('RlsLabelRadiobuttonComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RlsLabelRadiobuttonComponent]
    })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsLabelRadiobuttonComponent);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.rls-label-radiobutton')
    ).toBeTruthy();
  });

  it('should reflect the formControl value and state', () => {
    const control = formControl<string>('a');
    const fixture = TestBed.createComponent(RlsLabelRadiobuttonComponent);
    fixture.componentRef.setInput('formControl', control);
    fixture.componentRef.setInput('value', 'a');
    fixture.detectChanges();

    const radio: HTMLElement =
      fixture.nativeElement.querySelector('.rls-radiobutton');

    expect(radio.classList.contains('rls-radiobutton--checked')).toBeTrue();

    control.setValue('b');
    fixture.detectChanges();

    expect(radio.classList.contains('rls-radiobutton--checked')).toBeFalse();
  });

  it('should invoke control methods on user events', () => {
    const control = formControl<string>('a');
    const fixture = TestBed.createComponent(RlsLabelRadiobuttonComponent);
    fixture.componentRef.setInput('formControl', control);
    fixture.componentRef.setInput('value', 'b');
    fixture.detectChanges();

    const toggle: HTMLElement = fixture.nativeElement.querySelector(
      '.rls-label-radiobutton__component'
    );

    toggle.click();
    fixture.detectChanges();

    expect(control.value()).toBe('b');
  });
});
