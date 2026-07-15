import { TestBed } from '@angular/core/testing';

import { RlsBadgeComponent } from './badge.component';

describe('RlsBadgeComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsBadgeComponent] })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsBadgeComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });
});
