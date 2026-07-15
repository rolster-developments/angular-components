import {
  Component,
  computed,
  input,
  signal,
  ViewEncapsulation
} from '@angular/core';
import { AngularControl } from '@rolster/angular-forms';

import { RlsCheckboxComponent } from '../../atoms';

@Component({
  selector: 'rls-label-checkbox',
  standalone: true,
  templateUrl: 'label-checkbox.component.html',
  styleUrls: ['label-checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [RlsCheckboxComponent]
})
export class RlsLabelCheckboxComponent {
  public formControl = input<AngularControl<boolean>>();

  public disabled = input(false);

  public extended = input(false);

  private currentState = signal(false);

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
