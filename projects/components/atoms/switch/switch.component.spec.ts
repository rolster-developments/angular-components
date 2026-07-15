import { TestBed } from '@angular/core/testing';

import { RlsSwitchComponent } from './switch.component';

describe('RlsSwitchComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsSwitchComponent] })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsSwitchComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.rls-switch')).toBeTruthy();
  });

  it('should reflect the checked input', () => {
    const fixture = TestBed.createComponent(RlsSwitchComponent);
    fixture.componentRef.setInput('checked', true);
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement.querySelector('.rls-switch');

    expect(el.classList.contains('rls-switch--checked')).toBeTrue();
  });
});
