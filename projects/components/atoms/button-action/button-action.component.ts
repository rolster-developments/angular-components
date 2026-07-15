import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  input,
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
  public icon = input('', { alias: 'rls-button-action' });

  public disabled = input(false);

  public tooltip = input('');

  constructor(private ref: ElementRef<HTMLButtonElement>) {}

  public ngOnInit(): void {
    this.ref.nativeElement.classList.add('rls-button-action');
  }
}
