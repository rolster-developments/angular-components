import { TestBed } from '@angular/core/testing';

import { RlsCheckboxComponent } from './checkbox.component';

describe('RlsCheckboxComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsCheckboxComponent] })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsCheckboxComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.rls-checkbox')).toBeTruthy();
  });

  it('should reflect the checked input', () => {
    const fixture = TestBed.createComponent(RlsCheckboxComponent);
    fixture.componentRef.setInput('checked', true);
    fixture.detectChanges();

    const el: HTMLElement =
      fixture.nativeElement.querySelector('.rls-checkbox');

    expect(el.classList.contains('rls-checkbox--checked')).toBeTrue();
  });
});
