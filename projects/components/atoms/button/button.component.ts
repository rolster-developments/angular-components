import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
  ViewEncapsulation} from '@angular/core';

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
export class RlsButtonComponent implements OnInit, OnChanges {
  @Input('rls-button')
  public type: RlsButtonType = 'raised';

  @Input()
  public disabled = false;

  @Input()
  public prefixIcon = '';

  @Input()
  public suffixIcon = '';

  protected className = signal('rls-button__content--raised');

  constructor(private ref: ElementRef<HTMLButtonElement>) {}

  public ngOnInit(): void {
    this.ref.nativeElement.classList.add('rls-button');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const { type } = changes;

    if (type?.currentValue) {
      this.className.set(`rls-button__content--${type.currentValue}`);
    }
  }
}
