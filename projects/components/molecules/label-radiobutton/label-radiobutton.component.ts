import {
  Component,
  computed,
  input,
  signal,
  ViewEncapsulation
} from '@angular/core';
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
  public formControl = input<AngularControl<T | undefined>>();

  public value = input<T>();

  public disabled = input(false);

  public extended = input(false);

  private currentState = signal<T | undefined>(undefined);

  protected checked = computed(
    () =>
      (this.formControl()?.value() ?? this.currentState()) === this.value()
  );

  public onSelect(): void {
    const control = this.formControl();
    const value = this.value();

    if (control) {
      control.setValue(value);
    }

    this.currentState.set(value);
  }
}
