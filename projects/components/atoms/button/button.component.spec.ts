import { TestBed } from '@angular/core/testing';

import { RlsButtonComponent } from './button.component';

describe('RlsButtonComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsButtonComponent] })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsButtonComponent);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.rls-button__content')
    ).toBeTruthy();
  });

  it('should reflect the type input', () => {
    const fixture = TestBed.createComponent(RlsButtonComponent);
    fixture.componentRef.setInput('rls-button', 'flat');
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement.querySelector(
      '.rls-button__content'
    );

    expect(el.classList.contains('rls-button__content--flat')).toBeTrue();
  });
});
