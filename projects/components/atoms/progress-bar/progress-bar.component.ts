import { Component, computed, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'rls-progress-bar',
  standalone: true,
  templateUrl: 'progress-bar.component.html',
  styleUrls: ['progress-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RlsProgressBarComponent {
  public percentage = input(0);

  public indeterminate = input(false);

  protected width = computed(() => `${this.percentage()}%`);
}
