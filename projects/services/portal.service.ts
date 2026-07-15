import { ComponentType, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import {
  PortalComponent,
  PortalContainer,
  RlsPortalComponent,
  RlsPortalContainer
} from '../models';
import {
  OnPortal,
  OnPortalContainer,
  RlsPortalComponentProps,
  RlsPortalContainerProps,
  RlsPortalPublic
} from '../types';

interface PortalContainerProps<C, T> {
  component: ComponentType<T>;
  container: ComponentType<C>;
  props?: {
    component?: RlsPortalComponentProps<T>;
    container?: RlsPortalContainerProps<C>;
  };
}

@Injectable({ providedIn: 'root' })
export class RlsPortalService {
  constructor(private overlay: Overlay) {}

  public container<
    V = any,
    C extends OnPortalContainer = OnPortalContainer,
    T extends OnPortal<V> = OnPortal<V>
  >(containerProps: PortalContainerProps<C, T>): RlsPortalPublic<V> {
    const { container, component, props } = containerProps;

    const overlayContainer = this.overlay.create();
    const overlayComponent = this.overlay.create();

    const portalContainer = new PortalContainer(
      overlayContainer,
      new ComponentPortal(container),
      props?.container
    );

    const portalComponent = new PortalComponent(
      overlayComponent,
      new ComponentPortal(component),
      props?.component
    );

    portalContainer.instance.append(
      portalComponent.componentRef.location.nativeElement
    );

    overlayComponent.hostElement.remove();

    const rlsPortalContainer = new RlsPortalContainer<C, V>(
      portalContainer,
      portalComponent
    );

    portalComponent.instance.ngPortal(rlsPortalContainer);

    return rlsPortalContainer;
  }

  public component<T>(element: ComponentType<T>): RlsPortalComponent<T> {
    return new RlsPortalComponent(element, this.overlay);
  }
}
