import { TestBed } from '@angular/core/testing';

import { RlsAmountComponent } from './amount.component';

describe('RlsAmountComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsAmountComponent] })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsAmountComponent);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('rls-tabular-text')
    ).toBeTruthy();
  });

  it('should reflect the symbol input', () => {
    const fixture = TestBed.createComponent(RlsAmountComponent);
    fixture.componentRef.setInput('symbol', '$');
    fixture.detectChanges();

    const span: HTMLSpanElement =
      fixture.nativeElement.querySelector('span');

    expect(span.textContent?.trim()).toBe('$');
  });
});
