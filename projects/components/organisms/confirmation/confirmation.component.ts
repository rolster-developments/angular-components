import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { ModalConfirmationOptions } from '../../../models';
import { RlsButtonComponent } from '../../atoms';

@Component({
  selector: 'rls-confirmation',
  standalone: true,
  templateUrl: 'confirmation.component.html',
  styleUrls: ['confirmation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, RlsButtonComponent]
})
export class RlsConfirmationComponent {
  protected settings?: ModalConfirmationOptions;

  constructor(private ref: ElementRef<HTMLElement>) {}

  public execute(settings: ModalConfirmationOptions): void {
    settings.opening && settings.opening();

    this.settings = settings;

    this.ref.nativeElement.classList.add('visible');
  }

  protected onApprove(): void {
    if (this.settings) {
      const { approve, closing } = this.settings;

      this.hide();

      approve?.click && approve.click();
      closing && closing();
    }
  }

  protected onReject(): void {
    if (this.settings) {
      const { reject, closing } = this.settings;

      this.hide();

      reject?.click && reject.click();
      closing && closing();
    }
  }

  private hide(): void {
    this.ref.nativeElement.classList.remove('visible');
  }
}
