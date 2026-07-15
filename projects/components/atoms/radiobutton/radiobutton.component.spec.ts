import { TestBed } from '@angular/core/testing';

import { RlsRadiobuttonComponent } from './radiobutton.component';

describe('RlsRadiobuttonComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsRadiobuttonComponent] })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsRadiobuttonComponent);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.rls-radiobutton')
    ).toBeTruthy();
  });

  it('should reflect the checked input', () => {
    const fixture = TestBed.createComponent(RlsRadiobuttonComponent);
    fixture.componentRef.setInput('checked', true);
    fixture.detectChanges();

    const el: HTMLElement =
      fixture.nativeElement.querySelector('.rls-radiobutton');

    expect(el.classList.contains('rls-radiobutton--checked')).toBeTrue();
  });
});
