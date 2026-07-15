import { Component, Input, ViewEncapsulation } from '@angular/core';
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
  @Input()
  public formControl?: AngularControl<boolean>;

  @Input()
  public disabled = false;

  @Input()
  public extended = false;

  private currentState = false;

  protected get checked(): boolean {
    return this.formControl?.value ?? this.currentState;
  }

  public onToggle(): void {
    if (this.formControl) {
      this.formControl.setValue(!this.formControl.value);
    }

    this.currentState = !this.currentState;
  }
}
