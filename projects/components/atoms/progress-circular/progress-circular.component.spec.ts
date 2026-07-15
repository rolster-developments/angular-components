import { TestBed } from '@angular/core/testing';

import { RlsProgressCircularComponent } from './progress-circular.component';

describe('RlsProgressCircularComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsProgressCircularComponent] })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsProgressCircularComponent);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.rls-progress-circular__svg')
    ).toBeTruthy();
  });
});
