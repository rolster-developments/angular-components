import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  input,
  output,
  signal,
  untracked,
  ViewEncapsulation,
  WritableSignal
} from '@angular/core';
import {
  FilterCriteria,
  PageState,
  Pagination,
  PaginationController,
  PaginationTemplate
} from '@rolster/components';

import { RlsIconComponent } from '../../atoms';

export interface PaginationEvent<T> {
  firstPage: boolean;
  lastPage: boolean;
  suggestions: T[];
}

@Component({
  selector: 'rls-pagination',
  standalone: true,
  templateUrl: 'pagination.component.html',
  styleUrls: ['pagination.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, RlsIconComponent]
})
export class RlsPaginationComponent<T = any> {
  public suggestions = input<T[]>([]);

  public count = input<number>();

  public filter = input<FilterCriteria<T>>();

  public pagination = output<PaginationEvent<T>>();

  private controller: PaginationController<T>;

  protected template: WritableSignal<PaginationTemplate>;

  constructor() {
    this.controller = new PaginationController({
      count: this.count(),
      suggestions: this.suggestions()
    });

    this.template = signal(this.controller.template);

    effect(() => {
      const suggestions = this.suggestions();
      const count = this.count();

      this.controller = new PaginationController({
        suggestions,
        count,
        position: untracked(() => this.template().currentPage.value)
      });

      this.pagination.emit({
        firstPage: this.controller.template.firstPage,
        lastPage: this.controller.template.lastPage,
        suggestions: this.controller.page.collection
      });

      this.template.set(this.controller.template);
    });

    effect(() => {
      const filter = this.filter();

      const { template } = untracked(() => this.controller.filtrable(filter));

      this.template.set(template);
    });
  }

  public goToPagination(page: PageState): void {
    this.refreshPagination(this.controller.goToPage(page));
  }

  public goFirstPagination(): void {
    this.refreshPagination(this.controller.goFirstPage());
  }

  public goPreviousPagination(): void {
    this.refreshPagination(this.controller.goPreviousPage());
  }

  public goNextPagination(): void {
    this.refreshPagination(this.controller.goNextPage());
  }

  public goLastPagination(): void {
    this.refreshPagination(this.controller.goLastPage());
  }

  private refreshPagination(pagination?: Pagination<T>): void {
    if (pagination) {
      const { page, template } = pagination;
      const { firstPage, lastPage } = template;

      this.pagination.emit({
        firstPage,
        lastPage,
        suggestions: page.collection
      });

      this.template.set(template);
    }
  }
}
