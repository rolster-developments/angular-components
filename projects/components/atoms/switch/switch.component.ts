import { Component, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'rls-switch',
  standalone: true,
  templateUrl: 'switch.component.html',
  styleUrls: ['switch.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RlsSwitchComponent {
  public checked = input(false);

  public disabled = input(false);
}
