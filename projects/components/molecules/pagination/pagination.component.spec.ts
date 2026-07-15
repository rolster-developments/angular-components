import { TestBed } from '@angular/core/testing';

import { RlsPaginationComponent } from './pagination.component';

describe('RlsPaginationComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsPaginationComponent] })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsPaginationComponent);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.rls-pagination')
    ).toBeTruthy();
  });

  it('should reflect the suggestions and count inputs as pages', () => {
    const suggestions = Array.from({ length: 25 }, (_, index) => index);
    const fixture = TestBed.createComponent(RlsPaginationComponent);
    fixture.componentRef.setInput('suggestions', suggestions);
    fixture.componentRef.setInput('count', 10);
    fixture.detectChanges();

    const pages = fixture.nativeElement.querySelectorAll(
      '.rls-pagination__page'
    );

    expect(pages.length).toBe(3);
  });

  it('should invoke controller methods on user events', () => {
    const suggestions = Array.from({ length: 25 }, (_, index) => index);
    const fixture = TestBed.createComponent(RlsPaginationComponent);
    fixture.componentRef.setInput('suggestions', suggestions);
    fixture.componentRef.setInput('count', 10);
    fixture.detectChanges();

    let lastEvent: any;

    fixture.componentInstance.pagination.subscribe((event: any) => {
      lastEvent = event;
    });

    const nextButton: HTMLButtonElement =
      fixture.nativeElement.querySelectorAll('.rls-pagination__action')[2];

    nextButton.click();
    fixture.detectChanges();

    expect(lastEvent).toBeTruthy();
    expect(lastEvent.suggestions).toEqual(
      suggestions.slice(10, 20)
    );
  });
});
