import { CommonModule } from '@angular/common';
import { Component, input, ViewEncapsulation } from '@angular/core';

import { RlsIconComponent } from '../icon/icon.component';

@Component({
  selector: 'rls-message-icon',
  standalone: true,
  templateUrl: 'message-icon.component.html',
  styleUrls: ['message-icon.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, RlsIconComponent]
})
export class RlsMessageIconComponent {
  public icon = input<string>();
}
