import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { RlsIconComponent } from '../icon/icon.component';

@Component({
  selector: 'button[rls-button-action]',
  standalone: true,
  templateUrl: 'button-action.component.html',
  styleUrls: ['button-action.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, RlsIconComponent]
})
export class RlsButtonActionComponent implements OnInit {
  @Input('rls-button-action')
  public icon = '';

  @Input()
  public disabled = false;

  @Input()
  public tooltip = '';

  constructor(private ref: ElementRef<HTMLButtonElement>) {}

  public ngOnInit(): void {
    this.ref.nativeElement.classList.add('rls-button-action');
  }
}
