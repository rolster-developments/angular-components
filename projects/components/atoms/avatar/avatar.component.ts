import { Component, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'rls-avatar',
  standalone: true,
  templateUrl: 'avatar.component.html',
  styleUrls: ['avatar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RlsAvatarComponent {
  public rounded = input(false);

  public skeleton = input(false);
}
