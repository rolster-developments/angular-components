import { Component, signal,ViewEncapsulation } from '@angular/core';
import { FormControl } from '@rolster/angular-forms';
import {
  RolsterAutocompleteElement,
  RolsterListElement
} from '@rolster/components';
import { DateRange } from '@rolster/dates';
import { required } from '@rolster/validators/helpers';
import {
  RlsBottomSheetService,
  RlsConfirmationService,
  RlsModalService
} from '../../../../projects';
import { OnPortal, RlsPortalPrivate } from '../../../../projects';

@Component({
  selector: 'rls-portal',
  template: `<div>
    <div class="rls-title-regular" (click)="onEmit()">
      Daniel Castillo Pedroza
    </div>
    <div class="rls-title-regular">Adrian Castillo Pedroza</div>
    <div class="rls-title-regular">Fabian Castillo Pedroza</div>
  </div>`
})
class RlsComponentPortal implements OnPortal<string> {
  private portal?: RlsPortalPrivate<string>;

  public name = '';

  protected onEmit() {
    this.portal?.resolve('Daniel');
    this.portal?.destroy();
  }

  public ngPortal(portal: RlsPortalPrivate<string>): void {
    this.portal = portal;
  }
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePage {
  protected formControl = new FormControl<string | undefined>(
    'Daniel Castillo Pedroza',
    [required]
  );

  protected formNumber = new FormControl<number>(30, [required]);

  protected formRadiobutton = new FormControl<string | undefined>();

  protected formRange = new FormControl<DateRange | undefined>(DateRange.now());

  protected formDate = new FormControl<Date | undefined>(new Date(), [
    required
  ]);

  protected name = signal('Daniel');

  protected active = false;

  public names = [
    'Daniel Castillo Pedroza',
    'Nelson Ceballos',
    'Katherin Bolaño Narvaez',
    'Adrian Castillo Pedroza',
    'Fabian Castillo Pedroza',
    'Yessika Bolaño Narvaez',
    'Andres Bolaño Narvaez',
    'Milton Castillo Martinez',
    'Yomaira Pedroza Payares',
    'Cristiano Ronaldo Aveiro',
    'Lionel Messi Cuccitini'
  ];

  public elements: RolsterAutocompleteElement<string>[];

  constructor(
    private bottomSheetService: RlsBottomSheetService,
    private confirmationService: RlsConfirmationService,
    private modalService: RlsModalService
  ) {
    this.elements = this.names.map(
      (name) => new RolsterAutocompleteElement(name)
    );
  }

  public onClick(): void {
    this.active = !this.active;
    this.formControl.setValue(undefined);
    this.name.set('Adrian');

    this.confirmationService.execute({
      message: '¿Deseas realizar el registro del usuario en la Aplicación?',
      title: 'Rolster Developers',
      subtitle: 'Daniel Andres Castillo Pedroza',
      approve: {
        label: 'Aceptar'
      },
      reject: {
        label: 'Cancelar',
        theme: 'danger'
      }
    });
  }

  public onBottomSheet(): void {
    console.log(this.formDate.value);
    console.log(this.formRange.value);

    const sheet = this.modalService.create(RlsComponentPortal, {
      container: { autoclose: true },
      component: { name: 'Daniel Castillo' }
    });

    sheet.open();

    sheet.waiting().then((data) => {
      console.log(data);
    });
  }

  public onPagination(pagination: any): void {
    console.log(pagination);
  }
}
