import { TestBed } from '@angular/core/testing';

import { RlsButtonActionComponent } from './button-action.component';

describe('RlsButtonActionComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsButtonActionComponent] })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsButtonActionComponent);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.rls-button-action__content')
    ).toBeTruthy();
  });

  it('should reflect the tooltip input', () => {
    const fixture = TestBed.createComponent(RlsButtonActionComponent);
    fixture.componentRef.setInput('tooltip', 'Info');
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement.querySelector(
      '.rls-button-action__tooltip span'
    );

    expect(el.textContent?.trim()).toBe('Info');
  });
});
