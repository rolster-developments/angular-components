import { TestBed } from '@angular/core/testing';

import { RlsBallotComponent } from './ballot.component';

describe('RlsBallotComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsBallotComponent] })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsBallotComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.rls-ballot')).toBeTruthy();
  });

  it('should render initials, image and subtitle inputs', () => {
    const fixture = TestBed.createComponent(RlsBallotComponent);
    fixture.componentRef.setInput('initials', 'DC');
    fixture.componentRef.setInput('subtitle', 'A subtitle');
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('rls-avatar span').textContent
    ).toContain('DC');
    expect(
      fixture.nativeElement.querySelector('.rls-ballot__subtitle').textContent
    ).toContain('A subtitle');

    fixture.componentRef.setInput('img', 'photo.png');
    fixture.detectChanges();

    const img: HTMLImageElement =
      fixture.nativeElement.querySelector('rls-avatar img');

    expect(img.src).toContain('photo.png');
  });

  it('should reflect bordered and skeleton state classes', () => {
    const fixture = TestBed.createComponent(RlsBallotComponent);
    fixture.componentRef.setInput('bordered', true);
    fixture.componentRef.setInput('skeleton', true);
    fixture.detectChanges();

    const el: HTMLElement =
      fixture.nativeElement.querySelector('.rls-ballot');

    expect(el.classList.contains('rls-ballot--bordered')).toBeTrue();
    expect(el.classList.contains('rls-ballot--skeleton')).toBeTrue();
  });
});
