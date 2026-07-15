import { Component, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'rls-radiobutton',
  standalone: true,
  templateUrl: 'radiobutton.component.html',
  styleUrls: ['radiobutton.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RlsRadiobuttonComponent {
  public checked = input(false);

  public disabled = input(false);
}
