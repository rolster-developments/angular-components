import { Component, ViewEncapsulation } from '@angular/core';
import { personsElement } from '../../../../resources/persons';

@Component({
  selector: 'app-main',
  templateUrl: 'main.page.html',
  styleUrls: ['main.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent {
  public persons = personsElement;

  public checked = false;

  constructor() {}

  public onConfirmation(): void {}
}
