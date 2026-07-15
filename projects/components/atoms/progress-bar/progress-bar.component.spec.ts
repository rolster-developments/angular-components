import { TestBed } from '@angular/core/testing';

import { RlsProgressBarComponent } from './progress-bar.component';

describe('RlsProgressBarComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsProgressBarComponent] })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsProgressBarComponent);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.rls-progress-bar')
    ).toBeTruthy();
  });

  it('should reflect the percentage input', () => {
    const fixture = TestBed.createComponent(RlsProgressBarComponent);
    fixture.componentRef.setInput('percentage', 40);
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement.querySelector(
      '.rls-progress-bar__component'
    );

    expect(el.style.width).toBe('40%');
  });
});
