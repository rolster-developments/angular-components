import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AngularControl } from '@rolster/angular-forms';

import { RlsRadiobuttonComponent } from '../../atoms';

@Component({
  selector: 'rls-label-radiobutton',
  standalone: true,
  templateUrl: 'label-radiobutton.component.html',
  styleUrls: ['label-radiobutton.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [RlsRadiobuttonComponent]
})
export class RlsLabelRadiobuttonComponent<T = any> {
  @Input()
  public formControl?: AngularControl<T | undefined>;

  @Input()
  public value?: T;

  @Input()
  public disabled = false;

  @Input()
  public extended = false;

  private currentState?: T;

  protected get checked(): boolean {
    return (this.formControl?.value ?? this.currentState) === this.value;
  }

  public onSelect(): void {
    if (this.formControl) {
      this.formControl?.setValue(this.value);
    }

    this.currentState = this.value;
  }
}
