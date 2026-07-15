import { CommonModule } from '@angular/common';
import { Component, input, ViewEncapsulation } from '@angular/core';

import { RlsAvatarComponent, RlsSkeletonTextComponent } from '../../atoms';

@Component({
  selector: 'rls-ballot',
  standalone: true,
  templateUrl: 'ballot.component.html',
  styleUrls: ['ballot.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, RlsAvatarComponent, RlsSkeletonTextComponent]
})
export class RlsBallotComponent {
  public initials = input<string>();

  public subtitle = input<string>();

  public img = input<string>();

  public bordered = input(false);

  public skeleton = input(false);
}
