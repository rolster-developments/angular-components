import { ComponentType } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { RlsPortalService } from '../../../services';
import { OnPortal, RlsPortalProps, RlsPortalPublic } from '../../../types';
import { RlsBottomSheetComponent } from './bottom-sheet.component';

@Injectable({ providedIn: 'root' })
export class RlsBottomSheetService {
  constructor(private portalService: RlsPortalService) {}

  public create<V = any, C extends OnPortal<V> = OnPortal<V>>(
    component: ComponentType<C>,
    props?: RlsPortalProps<RlsBottomSheetComponent, C>
  ): RlsPortalPublic<V> {
    return this.portalService.container<V>({
      component,
      container: RlsBottomSheetComponent,
      props
    });
  }
}
