import { TestBed } from '@angular/core/testing';

import { RlsIconComponent } from './icon.component';

describe('RlsIconComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsIconComponent] })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsIconComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.rls-icon')).toBeTruthy();
  });

  it('should reflect the value input', () => {
    const fixture = TestBed.createComponent(RlsIconComponent);
    fixture.componentRef.setInput('value', 'search');
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement.querySelector('i');

    expect(el.classList.contains('rls-icon-search')).toBeTrue();
  });
});
