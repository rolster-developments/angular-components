import { Injectable } from '@angular/core';
import { ConfirmationOptions, RlsPortalComponent } from '../../../models';
import { RlsPortalService } from '../../../services';
import { RlsConfirmationComponent } from './confirmation.component';

type ConfirmationResponse = 'accept' | 'decline';

@Injectable({ providedIn: 'root' })
export class RlsConfirmationService {
  private portal: RlsPortalComponent<RlsConfirmationComponent>;

  private opening?: () => void;

  private closing?: () => void;

  constructor(portalService: RlsPortalService) {
    this.portal = portalService.component(RlsConfirmationComponent);
  }

  public setOpening(opening: () => void): void {
    this.opening = opening;
  }

  public setClosing(closing: () => void): void {
    this.closing = closing;
  }

  public execute(options: ConfirmationOptions): Promise<ConfirmationResponse> {
    const { opening, closing } = this;

    return new Promise<ConfirmationResponse>((resolve) => {
      if (options.approve) {
        const callApprove = options.approve.click;

        options.approve.click = () => {
          if (callApprove) {
            callApprove();
          }

          resolve('accept');
        };
      }

      if (options.reject) {
        const callReject = options.reject.click;

        options.reject.click = () => {
          if (callReject) {
            callReject();
          }

          resolve('decline');
        };
      }

      this.portal.instance.execute({ ...options, closing, opening });
    });
  }

  public destroy(): void {
    this.portal.destroy();
  }
}
