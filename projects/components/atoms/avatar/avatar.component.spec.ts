import { TestBed } from '@angular/core/testing';

import { RlsAvatarComponent } from './avatar.component';

describe('RlsAvatarComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsAvatarComponent] })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsAvatarComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.rls-avatar')).toBeTruthy();
  });

  it('should reflect the rounded input', () => {
    const fixture = TestBed.createComponent(RlsAvatarComponent);
    fixture.componentRef.setInput('rounded', true);
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement.querySelector('.rls-avatar');

    expect(el.classList.contains('rls-avatar--rounded')).toBeTrue();
  });
});
