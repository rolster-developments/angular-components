import { Component, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'rls-checkbox',
  standalone: true,
  templateUrl: 'checkbox.component.html',
  styleUrls: ['checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RlsCheckboxComponent {
  public checked = input(false);

  public disabled = input(false);
}
