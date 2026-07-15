import {
  Component,
  computed,
  input,
  signal,
  ViewEncapsulation
} from '@angular/core';
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
  public formControl = input<AngularControl<boolean>>();

  public disabled = input(false);

  public extended = input(false);

  protected currentState = signal(false);

  protected checked = computed(
    () => this.formControl()?.value() ?? this.currentState()
  );

  public onToggle(): void {
    const control = this.formControl();

    if (control) {
      control.setValue(!control.value());
    }

    this.currentState.set(!this.currentState());
  }
}
