import { TestBed } from '@angular/core/testing';

import { RlsTabularTextComponent } from './tabular-text.component';

describe('RlsTabularTextComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsTabularTextComponent] })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsTabularTextComponent);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelectorAll('.rls-tabular-text__char, .rls-tabular-text__pointer')
        .length
    ).toBe(0);
  });

  it('should reflect the value input', () => {
    const fixture = TestBed.createComponent(RlsTabularTextComponent);
    fixture.componentRef.setInput('value', '1.5');
    fixture.detectChanges();

    const spans: NodeListOf<HTMLSpanElement> =
      fixture.nativeElement.querySelectorAll('span');

    expect(spans.length).toBe(3);
    expect(spans[1].classList.contains('rls-tabular-text__pointer')).toBeTrue();
  });
});
