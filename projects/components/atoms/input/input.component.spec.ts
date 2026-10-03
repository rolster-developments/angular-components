import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AngularControl, formControl } from '@rolster/angular-forms';

import { RlsInputComponent } from './input.component';

describe('RlsInputComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsInputComponent] })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsInputComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.rls-input')).toBeTruthy();
  });

  it('should reflect the formControl value and state', () => {
    const control = formControl('inicial');
    const fixture = TestBed.createComponent(RlsInputComponent);
    fixture.componentRef.setInput('formControl', control);
    fixture.detectChanges();

    const el: HTMLInputElement = fixture.nativeElement.querySelector(
      '.rls-input__component'
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
    const fixture = TestBed.createComponent(RlsInputComponent);
    fixture.componentRef.setInput('formControl', control);
    fixture.detectChanges();

    const el: HTMLInputElement = fixture.nativeElement.querySelector(
      '.rls-input__component'
    );

    el.value = 'abc';
    el.dispatchEvent(new Event('input'));

    expect(control.value()).toBe('abc');

    el.dispatchEvent(new Event('blur'));

    expect(control.touched()).toBeTrue();
  });
});

interface FormatterControlOptions {
  formatOn?: 'input' | 'blur';
  formatter: (value: string) => string;
  value: string;
}

/**
 * Control mínimo con la semántica de formateo de `@rolster/angular-forms`.
 * Permite probar el componente con independencia de la versión instalada.
 */
function formatterControl(options: FormatterControlOptions) {
  const { formatter, formatOn } = options;
  const value = signal(
    formatOn === 'blur' ? options.value : formatter(options.value)
  );
  const focused = signal(false);
  const touched = signal(false);
  const disabled = signal(false);

  const control = {
    blur: () => {
      focused.set(false);
      touched.set(true);

      if (formatOn === 'blur') {
        value.set(formatter(value()));
      }
    },
    disabled,
    focus: () => focused.set(true),
    focused,
    formatOn,
    formatter,
    setValue: (input: string) => {
      value.set(formatOn === 'blur' ? input : formatter(input));
    },
    touch: () => touched.set(true),
    touched,
    value
  };

  return control as unknown as AngularControl<string> & typeof control;
}

describe('RlsInputComponent formatter', () => {
  const upperCase = (value: string) => value.toUpperCase();
  const onlyDigits = (value: string) => value.replace(/\D/g, '');

  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsInputComponent] })
  );

  function createInput(control: AngularControl<string>) {
    const fixture = TestBed.createComponent(RlsInputComponent);
    fixture.componentRef.setInput('formControl', control);
    fixture.detectChanges();

    const el: HTMLInputElement = fixture.nativeElement.querySelector(
      '.rls-input__component'
    );

    return { el, fixture };
  }

  it('should apply the formatter while typing and keep the caret position', () => {
    const control = formatterControl({ formatter: upperCase, value: '' });
    const { el } = createInput(control);

    el.value = 'abc';
    el.setSelectionRange(1, 1);
    el.dispatchEvent(new Event('input'));

    expect(el.value).toBe('ABC');
    expect(el.selectionStart).toBe(1);
    expect(control.value()).toBe('ABC');
  });

  it('should revert rejected characters although the control value does not change', () => {
    const control = formatterControl({ formatter: onlyDigits, value: '12' });
    const { el } = createInput(control);

    expect(el.value).toBe('12');

    el.value = '1a2';
    el.setSelectionRange(2, 2);
    el.dispatchEvent(new Event('input'));

    expect(el.value).toBe('12');
    expect(el.selectionStart).toBe(1);
    expect(control.value()).toBe('12');
  });

  it("should format only on blur when formatOn is 'blur'", () => {
    const control = formatterControl({
      formatOn: 'blur',
      formatter: upperCase,
      value: ''
    });
    const { el, fixture } = createInput(control);

    el.value = 'abc';
    el.dispatchEvent(new Event('input'));

    expect(el.value).toBe('abc');
    expect(control.value()).toBe('abc');

    el.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(control.value()).toBe('ABC');
    expect(el.value).toBe('ABC');
  });

  it('should not format while an IME composition is in progress', () => {
    const control = formatterControl({ formatter: upperCase, value: '' });
    const { el } = createInput(control);

    el.dispatchEvent(new Event('compositionstart'));
    el.value = 'abc';
    el.dispatchEvent(new Event('input'));

    expect(el.value).toBe('abc');

    el.dispatchEvent(new Event('compositionend'));

    expect(el.value).toBe('ABC');
    expect(control.value()).toBe('ABC');
  });
});
