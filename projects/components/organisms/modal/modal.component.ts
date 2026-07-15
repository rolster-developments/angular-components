import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { OnPortalContainer, RlsPortalContainerPrivate } from '../../../types';

@Component({
  selector: 'rls-modal',
  standalone: true,
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, OverlayModule]
})
export class RlsModalComponent implements OnPortalContainer {
  @Input()
  public visible = false;

  @Input()
  public autoclose = true;

  @Output()
  public visibleChange: EventEmitter<boolean>;

  private declare component: HTMLDivElement | null;

  private portal?: RlsPortalContainerPrivate;

  constructor(private ref: ElementRef<HTMLElement>) {
    this.visibleChange = new EventEmitter();
  }

  protected onBackdrop(): void {
    this.autoclose && this.close();
  }

  public open(delayInMs?: number): void {
    setTimeout(() => {
      this.changeVisible(true);
    }, delayInMs || 0);
  }

  public close(delayInMs = 0): void {
    setTimeout(() => {
      this.changeVisible(false);
      this.portal?.reject();
    }, delayInMs || 0);
  }

  public append<T extends HTMLElement = HTMLElement>(children: T): void {
    this.component = this.ref.nativeElement.querySelector<HTMLDivElement>(
      '.rls-modal__component'
    );

    this.component?.appendChild(children);
  }

  public ngPortal(portal: RlsPortalContainerPrivate): void {
    this.portal = portal;
  }

  private changeVisible(visible: boolean): void {
    this.visible = visible;
    this.visibleChange.emit(visible);
  }
}
