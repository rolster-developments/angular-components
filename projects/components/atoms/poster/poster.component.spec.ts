import { TestBed } from '@angular/core/testing';

import { RlsPosterComponent } from './poster.component';

describe('RlsPosterComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsPosterComponent] })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsPosterComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });
});
