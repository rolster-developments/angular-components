import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  ElementRef,
  input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { RlsIconComponent } from '../icon/icon.component';

export type RlsButtonType = 'raised' | 'flat' | 'stroked' | 'outline' | 'ghost';

@Component({
  selector: 'button[rls-button]',
  standalone: true,
  templateUrl: 'button.component.html',
  styleUrls: ['button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, RlsIconComponent]
})
export class RlsButtonComponent implements OnInit {
  public type = input<RlsButtonType>('raised', { alias: 'rls-button' });

  public disabled = input(false);

  public prefixIcon = input('');

  public suffixIcon = input('');

  protected className = computed(() => `rls-button__content--${this.type()}`);

  constructor(private ref: ElementRef<HTMLButtonElement>) {}

  public ngOnInit(): void {
    this.ref.nativeElement.classList.add('rls-button');
  }
}
