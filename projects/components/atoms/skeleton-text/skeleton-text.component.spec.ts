import { TestBed } from '@angular/core/testing';

import { RlsSkeletonTextComponent } from './skeleton-text.component';

describe('RlsSkeletonTextComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsSkeletonTextComponent] })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsSkeletonTextComponent);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.rls-skeleton-text__value')
    ).toBeTruthy();
  });

  it('should reflect the active input', () => {
    const fixture = TestBed.createComponent(RlsSkeletonTextComponent);
    fixture.componentRef.setInput('active', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('rls-skeleton')).toBeTruthy();
    expect(
      fixture.nativeElement.querySelector('.rls-skeleton-text__value')
    ).toBeFalsy();
  });
});
