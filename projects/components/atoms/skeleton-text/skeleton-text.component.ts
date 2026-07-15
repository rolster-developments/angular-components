import { CommonModule } from '@angular/common';
import { Component, input, ViewEncapsulation } from '@angular/core';

import { RlsSkeletonComponent } from '../skeleton/skeleton.component';

@Component({
  selector: 'rls-skeleton-text',
  standalone: true,
  templateUrl: 'skeleton-text.component.html',
  styleUrls: ['skeleton-text.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, RlsSkeletonComponent]
})
export class RlsSkeletonTextComponent {
  public active = input(false);
}
