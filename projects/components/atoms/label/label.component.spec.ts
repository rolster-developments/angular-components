import { TestBed } from '@angular/core/testing';

import { RlsLabelComponent } from './label.component';

describe('RlsLabelComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsLabelComponent] })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsLabelComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });
});
