import { TestBed } from '@angular/core/testing';
import { formControl } from '@rolster/angular-forms';
import { ValidatorFn } from '@rolster/validators';

import { RlsMessageFormErrorComponent } from './message-form-error.component';

const required: ValidatorFn<string> = (value) =>
  value ? undefined : { id: 'required', message: 'This field is required' };

describe('RlsMessageFormErrorComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RlsMessageFormErrorComponent]
    })
  );

  it('should not render a message without a formControl', () => {
    const fixture = TestBed.createComponent(RlsMessageFormErrorComponent);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.rls-message-form-error')
    ).toBeFalsy();
  });

  it('should not render a message when the control is invalid but untouched', () => {
    const control = formControl('', [required]);
    const fixture = TestBed.createComponent(RlsMessageFormErrorComponent);
    fixture.componentRef.setInput('formControl', control);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.rls-message-form-error')
    ).toBeFalsy();
  });

  it('should render the error message when the control is invalid and touched', () => {
    const control = formControl('', [required]);
    const fixture = TestBed.createComponent(RlsMessageFormErrorComponent);
    fixture.componentRef.setInput('formControl', control);

    control.touch();
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement.querySelector(
      '.rls-message-form-error'
    );

    expect(el).toBeTruthy();
    expect(el.textContent).toContain('This field is required');
  });
});
