import { TestBed } from '@angular/core/testing';

import { RlsMessageIconComponent } from './message-icon.component';

describe('RlsMessageIconComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsMessageIconComponent] })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsMessageIconComponent);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.rls-message-icon')
    ).toBeTruthy();
  });

  it('should reflect the icon input', () => {
    const fixture = TestBed.createComponent(RlsMessageIconComponent);
    fixture.componentRef.setInput('icon', 'warning');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('rls-icon')).toBeTruthy();
  });
});
