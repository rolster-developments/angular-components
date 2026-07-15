import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AngularControl } from '@rolster/angular-forms';

import { RlsSwitchComponent } from '../../atoms';

@Component({
  selector: 'rls-label-switch',
  standalone: true,
  templateUrl: 'label-switch.component.html',
  styleUrls: ['label-switch.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [RlsSwitchComponent]
})
export class RlsLabelSwitchComponent {
  @Input()
  public formControl?: AngularControl<boolean>;

  @Input()
  public disabled = false;

  @Input()
  public extended = false;

  protected currentState = false;

  protected get checked(): boolean {
    return this.formControl?.value ?? this.currentState;
  }

  public onToggle(): void {
    if (this.formControl) {
      this.formControl?.setValue(!this.formControl.value);
    }

    this.currentState = !this.currentState;
  }
}
