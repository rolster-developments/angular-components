# Rolster Angular Components

Repository for Kit Components in Angular 19.

## Installation

```
npm i @rolster/angular-components
```

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 19.2.0.

## Configuration

The package targets `@angular/core`, `@angular/common` and `@angular/cdk` in the
`^19.2.0` range; the overlay infrastructure of `@angular/cdk` is required by the
modal, bottom sheet and confirmation services. It also pulls
`@rolster/angular-forms`, `@rolster/commons`, `@rolster/components`,
`@rolster/dates`, `@rolster/strings` and `@rolster/validators`.

You must install the `@rolster/types` to define package data types, which are
configured by adding them to the `files` property of the `tsconfig.json` file.

```json
{
  "files": ["node_modules/@rolster/types/index.d.ts"]
}
```

### Styles

Each component ships its own compiled CSS, but every one of them reads the
design tokens (`--rls-*` custom properties), the typography and the icon font of
`@rolster/styles-foundations`. Install it and import the foundations, the icon
font and the typeface once, in the global stylesheet of the application:

```scss
@import '@rolster/styles-foundations/scss/styles';
@import '@rolster/styles-foundations/icons/rolster-icons';
@import '@rolster/styles-foundations/fonts/poppins/poppins';
```

The `design-system-bordered`, `design-system-filled` and `design-system-gradient`
entry points of that package wrap their rules in a `.rls-design-system-*` class
and restyle the same components; they are not needed here, so no wrapper class
has to be added to the document.

Color is applied through the `rls-theme` attribute, resolved by the foundations
stylesheet and accepted by any element:

```html
<button rls-button="raised" rls-theme="warning">Registrar producto</button>
```

### Standalone components

Every component of the package is standalone, so there is no module to import:
declare the ones you use in the `imports` array of the consuming component.

```typescript
import { Component } from '@angular/core';
import {
  RlsBallotComponent,
  RlsButtonComponent,
  RlsFieldTextComponent
} from '@rolster/angular-components';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: 'profile.component.html',
  imports: [RlsBallotComponent, RlsButtonComponent, RlsFieldTextComponent]
})
export class ProfileComponent {}
```

## Features

The catalog is organized as atoms, molecules and organisms. Two atoms are
attribute components (`button[rls-button]` and `button[rls-button-action]`): they
are applied over a native `<button>` instead of a custom tag, and the attribute
itself carries the main input.

### Atoms

| Component                      | Selector                    | Description                                                                            |
| ------------------------------ | --------------------------- | -------------------------------------------------------------------------------------- |
| `RlsAmountComponent`           | `rls-amount`                | Renders a number as a formatted currency amount, with optional `symbol` and `decimals` |
| `RlsAvatarComponent`           | `rls-avatar`                | Frame for an image or initials, square or `rounded`, with a `skeleton` state           |
| `RlsBadgeComponent`            | `rls-badge`                 | Themed badge around the projected content                                              |
| `RlsButtonComponent`           | `button[rls-button]`        | Button in `raised`, `flat`, `stroked`, `outline` or `ghost` style, with optional icons |
| `RlsButtonActionComponent`     | `button[rls-button-action]` | Icon-only button; the attribute carries the icon name and `tooltip` the hint           |
| `RlsCheckboxComponent`         | `rls-checkbox`              | Checkbox mark with `checked` and `disabled` states, without a label                    |
| `RlsIconComponent`             | `rls-icon`                  | Renders an icon of the Rolster icon font from its name                                 |
| `RlsInputComponent`            | `rls-input`                 | Base `text`, `number` or `email` input, bound to a control or with local state         |
| `RlsInputMoneyComponent`       | `rls-input-money`           | Currency input that shows the formatted amount while it is not focused                 |
| `RlsInputNumberComponent`      | `rls-input-number`          | Numeric input built over `RlsInputComponent`                                           |
| `RlsInputPasswordComponent`    | `rls-input-password`        | Password input that can switch between `password` and `text`                           |
| `RlsInputTextComponent`        | `rls-input-text`            | Text or email input built over `RlsInputComponent`                                     |
| `RlsLabelComponent`            | `rls-label`                 | Themed inline label around the projected text                                          |
| `RlsMessageIconComponent`      | `rls-message-icon`          | Message line prefixed with an optional `icon`                                          |
| `RlsPosterComponent`           | `rls-poster`                | Themed block used to highlight the projected content                                   |
| `RlsProgressBarComponent`      | `rls-progress-bar`          | Linear progress, driven by `percentage` or `indeterminate`                             |
| `RlsProgressCircularComponent` | `rls-progress-circular`     | Indeterminate circular progress indicator                                              |
| `RlsRadiobuttonComponent`      | `rls-radiobutton`           | Radio mark with `checked` and `disabled` states, without a label                       |
| `RlsSkeletonComponent`         | `rls-skeleton`              | Empty animated placeholder block                                                       |
| `RlsSkeletonTextComponent`     | `rls-skeleton-text`         | Shows the projected text, or a skeleton while `active`                                 |
| `RlsSwitchComponent`           | `rls-switch`                | Switch mark with `checked` and `disabled` states, without a label                      |
| `RlsTabularTextComponent`      | `rls-tabular-text`          | Renders a string character by character with tabular spacing, isolating `.` and `,`    |

```html
<button rls-button="outline" prefixIcon="save" (click)="onSave()">
  Registrar producto
</button>

<rls-amount [value]="106564" [decimals]="true" symbol="$"></rls-amount>
```

```typescript
import { Component } from '@angular/core';
import {
  RlsAmountComponent,
  RlsButtonComponent
} from '@rolster/angular-components';

@Component({
  selector: 'app-invoice',
  standalone: true,
  templateUrl: 'invoice.component.html',
  imports: [RlsAmountComponent, RlsButtonComponent]
})
export class InvoiceComponent {
  public onSave(): void {
    // ...
  }
}
```

### Molecules

| Component                      | Selector                 | Description                                                                            |
| ------------------------------ | ------------------------ | -------------------------------------------------------------------------------------- |
| `RlsBallotComponent`           | `rls-ballot`             | Row with avatar (`img` or `initials`), title and `subtitle`, `bordered` and `skeleton` |
| `RlsFieldMoneyComponent`       | `rls-field-money`        | Currency field: label, money input and validation message                              |
| `RlsFieldNumberComponent`      | `rls-field-number`       | Numeric field: label, number input and validation message                              |
| `RlsFieldPasswordComponent`    | `rls-field-password`     | Password field with an action that toggles the visibility of the value                 |
| `RlsFieldTextComponent`        | `rls-field-text`         | Text or email field: label, input and validation message                               |
| `RlsLabelCheckboxComponent`    | `rls-label-checkbox`     | Checkbox with a projected label that toggles the bound control                         |
| `RlsLabelRadiobuttonComponent` | `rls-label-radiobutton`  | Radio with a projected label that writes its `value` into the bound control            |
| `RlsLabelSwitchComponent`      | `rls-label-switch`       | Switch with a projected label that toggles the bound control                           |
| `RlsMessageFormErrorComponent` | `rls-message-form-error` | Shows the error of an `AngularControl` while it is wrong                               |
| `RlsPaginationComponent`       | `rls-pagination`         | Paginates a collection and emits a `PaginationEvent<T>` on every page change           |
| `RlsPickerDayComponent`        | `rls-picker-day`         | Month grid used to select a day number                                                 |
| `RlsPickerDayRangeComponent`   | `rls-picker-day-range`   | Month grid used to select a `DateRange` with two clicks                                |
| `RlsPickerMonthComponent`      | `rls-picker-month`       | Grid of the twelve months of a year                                                    |
| `RlsPickerMonthTitleComponent` | `rls-picker-month-title` | Picker header whose previous/next actions move the month or year control               |
| `RlsPickerYearComponent`       | `rls-picker-year`        | Paged grid of years, eight per page                                                    |

```html
<rls-pagination
  [suggestions]="names"
  [count]="3"
  (pagination)="onPagination($event)"
>
</rls-pagination>
```

```typescript
import { Component } from '@angular/core';
import {
  PaginationEvent,
  RlsPaginationComponent
} from '@rolster/angular-components';

@Component({
  selector: 'app-catalog',
  standalone: true,
  templateUrl: 'catalog.component.html',
  imports: [RlsPaginationComponent]
})
export class CatalogComponent {
  protected names = ['Daniel', 'Adrian', 'Fabian', 'Katherin'];

  protected visibles: string[] = [];

  public onPagination({ suggestions }: PaginationEvent<string>): void {
    this.visibles = suggestions;
  }
}
```

### Organisms

| Component                       | Selector                 | Description                                                                                |
| ------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------ |
| `RlsBottomSheetComponent`       | `rls-bottom-sheet`       | Sheet anchored to the bottom with backdrop and `autoclose`; implements `OnPortalContainer` |
| `RlsConfirmationComponent`      | `rls-confirmation`       | Confirmation dialog mounted by `RlsConfirmationService`; not declared in templates         |
| `RlsFieldAutocompleteComponent` | `rls-field-autocomplete` | Field with a filtered list of `AutocompleteElement<T>` and keyboard navigation             |
| `RlsFieldDateComponent`         | `rls-field-date`         | Read-only date field that opens `rls-picker-date` inside a modal                           |
| `RlsFieldDateRangeComponent`    | `rls-field-date-range`   | Read-only range field that opens `rls-picker-date-range` inside a modal                    |
| `RlsFieldSelectComponent`       | `rls-field-select`       | Field with a dropdown list of `ListElement<T>` suggestions                                 |
| `RlsModalComponent`             | `rls-modal`              | Centered modal with backdrop and `autoclose`; implements `OnPortalContainer`               |
| `RlsPickerDateComponent`        | `rls-picker-date`        | Date picker with day, month and year views; reports through the `listener` output          |
| `RlsPickerDateRangeComponent`   | `rls-picker-date-range`  | `DateRange` picker with day, month and year views                                          |

```html
<rls-field-select [suggestions]="elements" (value)="onSelect($event)">
  Ciudad de residencia
</rls-field-select>
```

```typescript
import { Component } from '@angular/core';
import { RolsterListElement } from '@rolster/components';
import { RlsFieldSelectComponent } from '@rolster/angular-components';

@Component({
  selector: 'app-address',
  standalone: true,
  templateUrl: 'address.component.html',
  imports: [RlsFieldSelectComponent]
})
export class AddressComponent {
  protected elements = ['Bogotá', 'Medellín', 'Cartagena'].map(
    (city) => new RolsterListElement(city)
  );

  public onSelect(city?: string): void {
    // ...
  }
}
```

### Services

Every service is registered with `@Injectable({ providedIn: 'root' })`, so it is
injected without any extra provider.

| Service                  | Member                                          | Description                                                                  |
| ------------------------ | ----------------------------------------------- | ---------------------------------------------------------------------------- |
| `RlsBottomSheetService`  | `create(component, props?)`                     | Mounts `component` inside a `RlsBottomSheetComponent` and returns the portal |
| `RlsModalService`        | `create(component, props?)`                     | Mounts `component` inside a `RlsModalComponent` and returns the portal       |
| `RlsConfirmationService` | `execute(options)`                              | Shows the confirmation and resolves with `'accept'` or `'decline'`           |
| `RlsConfirmationService` | `setOpening(callback)` / `setClosing(callback)` | Callbacks invoked every time the confirmation opens or closes                |
| `RlsConfirmationService` | `destroy()`                                     | Destroys the overlay that holds the confirmation                             |
| `RlsPortalService`       | `container({ component, container, props? })`   | Low level factory used by the two services above                             |
| `RlsPortalService`       | `component(element)`                            | Attaches a single component to its own overlay, without a container          |

`create` receives the component type and an optional `RlsPortalProps`, whose
`container` and `component` members are assigned to each instance; it returns a
`RlsPortalPublic<V>` with `open`, `close`, `destroy`, `visible`, `waiting`,
`subscribe` and `emit`.

```typescript
import { Component } from '@angular/core';
import { RlsConfirmationService } from '@rolster/angular-components';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  constructor(private confirmationService: RlsConfirmationService) {}

  public async onRegister(): Promise<void> {
    const response = await this.confirmationService.execute({
      title: 'Rolster Developers',
      subtitle: 'Daniel Andrés Castillo Pedroza',
      message: '¿Deseas realizar el registro del usuario?',
      approve: { label: 'Aceptar' },
      reject: { label: 'Cancelar', theme: 'danger' }
    });

    if (response === 'accept') {
      // ...
    }
  }
}
```

### Portals

A portal is a component rendered outside the template that created it, over a
CDK overlay. `RlsPortalService` builds two overlays: one for the container
(`rls-modal` or `rls-bottom-sheet`) and one for the component, whose host element
is moved into the container through `OnPortalContainer.append`.

| Symbol                     | Description                                                                                                                                   |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `PortalContainer<C>`       | `OverlayRef` plus `ComponentPortal` of a container; assigns `RlsPortalContainerProps` and disposes the overlay on `destroy`                   |
| `PortalComponent<T>`       | `OverlayRef` plus `ComponentPortal` of the mounted component, with `RlsPortalComponentProps`                                                  |
| `RlsPortalContainer<C, V>` | Joins both; the object returned by `create`, seen as `RlsPortalPublic<V>` by the caller and as `RlsPortalPrivate<V>` by the mounted component |
| `RlsPortalComponent<T>`    | A single component over its own overlay, with no container; used by `RlsConfirmationService`                                                  |
| `OnPortal<V>`              | Contract of the mounted component: `ngPortal(portal: RlsPortalPrivate<V>)`                                                                    |
| `OnPortalContainer`        | Contract of a container: `append`, `open`, `close`, `ngPortal` and the `visible` signal                                                       |

In practice a consumer only implements `OnPortal` on the component handed to
`create`, and keeps the received portal to `resolve` a value, `send` events to
the subscribers or `destroy` everything. `OnPortalContainer` is only implemented
to build a container of your own and mount it with `RlsPortalService.container`.

```typescript
import { Component } from '@angular/core';
import {
  OnPortal,
  RlsModalService,
  RlsPortalPrivate
} from '@rolster/angular-components';

@Component({
  selector: 'app-user-portal',
  standalone: true,
  template: `<div (click)="onSelect()">{{ name }}</div>`
})
export class UserPortalComponent implements OnPortal<string> {
  public name = '';

  private portal?: RlsPortalPrivate<string>;

  public ngPortal(portal: RlsPortalPrivate<string>): void {
    this.portal = portal;
  }

  protected onSelect(): void {
    this.portal?.resolve(this.name);
    this.portal?.destroy();
  }
}

@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: 'users.component.html'
})
export class UsersComponent {
  constructor(private modalService: RlsModalService) {}

  public async onOpen(): Promise<void> {
    const portal = this.modalService.create(UserPortalComponent, {
      container: { autoclose: true },
      component: { name: 'Daniel Castillo' }
    });

    portal.open();

    const name = await portal.waiting();
  }
}
```

### Form integration

The field components do not use `@angular/forms`: their `formControl` input
receives a control of `@rolster/angular-forms`, typed as `AngularControl<T>` in
the inputs and the atoms and molecules, and as `AngularVoid<T>` (an alias of
`AngularControl<T | undefined>`) in `rls-field-date`, `rls-field-date-range`,
`rls-field-select` and `rls-field-autocomplete`, which can clear their value.

The binding is optional. With a control, the component reads `value()`,
`focused()`, `disabled()` and `wrong()` from it and writes back with `setValue`,
`focus`, `blur` and `touch`, and `rls-message-form-error` renders its error.
Without a control the component keeps its own state and only reports through the
`value` output.

`rls-input` and the inputs and fields built over it honour the `formatter` and
`formatOn` options of a control that exposes them. While the user types (or
pastes) the component applies the formatter before writing the value, keeps the
caret in place when the text length changes, reverts characters the formatter
rejects even when the control signal does not change, and waits for the end of
an IME composition before formatting. With `formatOn: 'blur'` the raw text is
kept until the field loses focus and the control formats it. The options are
read structurally, so the component also compiles against a version of
`@rolster/angular-forms` that does not provide them yet.

```html
<rls-field-date [formControl]="formDate" [maxDate]="today">
  Fecha de nacimiento
</rls-field-date>
```

```typescript
import { Component } from '@angular/core';
import { FormControl } from '@rolster/angular-forms';
import { required } from '@rolster/validators/helpers';
import { RlsFieldDateComponent } from '@rolster/angular-components';

@Component({
  selector: 'app-birthday',
  standalone: true,
  templateUrl: 'birthday.component.html',
  imports: [RlsFieldDateComponent]
})
export class BirthdayComponent {
  protected formDate = new FormControl<Date | undefined>(new Date(), [
    required
  ]);

  protected today = new Date();
}
```

`rls-picker-date` and `rls-picker-date-range` drive their day, month and year
views with `PickerDateGroup` and `PickerDateRangeGroup`, two `FormGroup`
subclasses of `@rolster/angular-forms` that expose the `day`, `month` and `year`
controls and a `setDate(date)` command. They are internal to those pickers and
are not reachable from the entry point of the package.

### Types

| Type                                                       | Used by                                                                        |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `RlsTheme`                                                 | `theme` of `ConfirmationAction`, and the values of the `rls-theme` attribute   |
| `RlsButtonType`                                            | `type` input of `button[rls-button]`, aliased as `rls-button`                  |
| `PaginationEvent<T>`                                       | Payload of the `pagination` output of `rls-pagination`                         |
| `ConfirmationOptions`                                      | Argument of `RlsConfirmationService.execute`                                   |
| `ConfirmationAction`                                       | `approve` and `reject` of `ConfirmationOptions`                                |
| `ModalConfirmationOptions`                                 | `ConfirmationOptions` plus `opening` and `closing`, read by `rls-confirmation` |
| `RlsPortalPublic<V>`                                       | Return of `create` in the modal and bottom sheet services                      |
| `RlsPortalPrivate<V>`                                      | Portal received by `OnPortal.ngPortal`                                         |
| `RlsPortalContainerPrivate`                                | Portal received by `OnPortalContainer.ngPortal`                                |
| `RlsPortalProps<C, T>`                                     | Second argument of `create`, with `container` and `component`                  |
| `RlsPortalContainerProps<C>`, `RlsPortalComponentProps<T>` | Members of `RlsPortalProps`                                                    |
| `RlsPortalCallback<V>`                                     | Callback of `subscribe` and `receive`                                          |
| `OnPortal<V>`, `OnPortalContainer`                         | Contracts of the mounted component and of a container                          |

## Contributing

- Daniel Andrés Castillo Pedroza :rocket:
