import { TestBed } from '@angular/core/testing';

import { RlsSkeletonComponent } from './skeleton.component';

describe('RlsSkeletonComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsSkeletonComponent] })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsSkeletonComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });
});
