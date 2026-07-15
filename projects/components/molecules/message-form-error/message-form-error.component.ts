import { CommonModule } from '@angular/common';
import { Component, input, ViewEncapsulation } from '@angular/core';
import { AngularControl } from '@rolster/angular-forms';

import { RlsMessageIconComponent } from '../../atoms/message-icon/message-icon.component';

@Component({
  selector: 'rls-message-form-error',
  standalone: true,
  templateUrl: 'message-form-error.component.html',
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, RlsMessageIconComponent]
})
export class RlsMessageFormErrorComponent {
  public className = input('rls-message-form-error');

  public formControl = input<AngularControl>();
}
