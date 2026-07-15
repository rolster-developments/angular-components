import { Component, computed, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'rls-icon',
  standalone: true,
  templateUrl: 'icon.component.html',
  styleUrls: ['icon.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RlsIconComponent {
  public value = input('');

  public skeleton = input(false);

  protected className = computed(() =>
    this.value() ? `rls-icon-${this.value()}` : ''
  );
}
