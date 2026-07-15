import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';

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
  @Input()
  public initials?: string;

  @Input()
  public subtitle?: string;

  @Input()
  public img?: string;

  @Input()
  public bordered = false;

  @Input()
  public skeleton = false;
}
