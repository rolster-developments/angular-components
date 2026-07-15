import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  signal,
  SimpleChanges,
  ViewEncapsulation} from '@angular/core';
import { AngularControlEmpty } from '@rolster/angular-forms';
import {
  AutocompleteElement,
  AutocompleteStore,
  createAutocompleteStore,
  locationListCanTop,
  navigationListFromElement,
  navigationListFromInput
} from '@rolster/components';

import { RlsIconComponent } from '../../atoms';
import {
  RlsBallotComponent,
  RlsMessageFormErrorComponent
} from '../../molecules';

const MAX_ELEMENTS = 6;

@Component({
  selector: 'rls-field-autocomplete',
  standalone: true,
  templateUrl: 'field-autocomplete.component.html',
  styleUrls: ['field-autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    RlsIconComponent,
    RlsBallotComponent,
    RlsMessageFormErrorComponent
  ]
})
export class RlsFieldAutocompleteComponent<
    T = any,
    E extends AutocompleteElement<T> = AutocompleteElement<T>
  >
  implements OnInit, OnDestroy, OnChanges
{
  @Input()
  public suggestions: E[] = [];

  @Input()
  public formControl?: AngularControlEmpty<T>;

  @Input()
  public label = true;

  @Input()
  public placeholder = '';

  @Input()
  public disabled = false;

  @Output()
  public value: EventEmitter<T | undefined>;

  private content: HTMLDivElement | null = null;

  private list: HTMLUListElement | null = null;

  private input: HTMLInputElement | null = null;

  private unsusbcription?: () => void;

  private position = 0;

  private store: AutocompleteStore<T, E>;

  protected coincidences: E[] = [];

  protected inputValue = signal('');

  protected filterValue = signal('');

  protected visible = false;

  protected higher = false;

  constructor(private ref: ElementRef<HTMLElement>) {
    this.store = {
      pattern: '',
      coincidences: [],
      previous: null
    };

    this.value = new EventEmitter();
  }

  public ngOnInit(): void {
    this.content =
      this.ref.nativeElement.querySelector<HTMLDivElement>('.rls-field-select');

    this.list = this.ref.nativeElement.querySelector<HTMLUListElement>(
      '.rls-field-list__ul'
    );

    this.input = this.ref.nativeElement.querySelector<HTMLInputElement>(
      '.rls-field-list__ul__control'
    );
  }

  public ngOnDestroy(): void {
    this.unsusbcription && this.unsusbcription();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const { formControl, suggestions } = changes;

    if (suggestions?.currentValue && this.formControl) {
      this.refreshCoincidences(this.filterValue(), true);
      this.checkSuggestion(suggestions.currentValue, this.formControl.value);
    }

    if (formControl) {
      this.unsusbcription && this.unsusbcription();

      this.unsusbcription = formControl.currentValue?.subscribe(
        (value: T | undefined) => {
          this.checkSuggestion(this.suggestions, value);
        }
      );
    }
  }

  @HostListener('document:click', ['$event.target'])
  public onDocumentClick(element: HTMLElement) {
    !this.ref.nativeElement.contains(element) && this.closeSuggestions();
  }

  public get disabledInput(): boolean {
    return this.formControl?.disabled ?? this.disabled;
  }

  public onInputClick(): void {
    this.openSuggestions();
    this.input?.focus();
  }

  public onInputFocus(): void {
    this.formControl?.focus();
  }

  public onInputBlur(): void {
    this.formControl?.blur();
  }

  public onInputValue(event: Event): void {
    const { value } = event.target as HTMLInputElement;

    this.filterValue.set(value);
    this.refreshCoincidences(value);
  }

  public onInputKeydown(event: KeyboardEvent): void {
    switch (event.code) {
      case 'Space':
      case 'Enter':
        this.openSuggestions();
        break;

      case 'Escape':
      case 'Tab':
        this.closeSuggestions();
        break;

      default:
        if (this.visible) {
          const { content, list } = this;

          this.position =
            navigationListFromInput({ content, event, list }) ?? 0;
        }
        break;
    }
  }

  public onActionClick(): void {
    this.emitValue(undefined);
  }

  public onBackdropClick(): void {
    this.visible = false;
  }

  public onKeydownElement(suggestion: E, event: KeyboardEvent): void {
    if (event.code === 'Enter') {
      this.onSelect(suggestion);
    } else {
      const { content, input, list, position } = this;

      this.position = navigationListFromElement({
        content,
        event,
        input,
        list,
        position
      });
    }
  }

  public onSelect({ value }: E): void {
    this.visible = false;
    this.emitValue(value);
    this.formControl?.touch();
  }

  private openSuggestions(): void {
    const { content, list } = this;

    this.higher = locationListCanTop(content, list);
    this.visible = true;
  }

  private closeSuggestions(): void {
    this.visible = false;
  }

  private emitValue(value?: T): void {
    this.formControl?.setValue(value);
    this.value.emit(value);
  }

  private refreshCoincidences(pattern: string | null, reboot = false): void {
    const { collection, store } = createAutocompleteStore<T, E>({
      pattern,
      suggestions: this.suggestions,
      reboot,
      store: this.store
    });

    this.store = store;
    this.coincidences = collection.slice(0, MAX_ELEMENTS);
  }

  private checkSuggestion(suggestions: E[], value?: T): void {
    const suggestion = value
      ? suggestions.find((element) => element.compareTo(value))
      : undefined;

    if (value && !suggestion) {
      this.emitValue(undefined);
    }

    this.inputValue.set(suggestion?.description ?? '');
  }
}
