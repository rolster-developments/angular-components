import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
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
  @Input()
  public className = 'rls-message-form-error';

  @Input()
  public formControl?: AngularControl;
}
