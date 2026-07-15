import { CommonModule } from '@angular/common';
import { Component, input, ViewEncapsulation } from '@angular/core';

const CLASS_BASE = 'rls-tabular-text';
const POINTERS = ['.', ','];

@Component({
  selector: 'rls-tabular-text',
  standalone: true,
  templateUrl: 'tabular-text.component.html',
  styleUrls: ['tabular-text.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule]
})
export class RlsTabularTextComponent {
  public value = input('');

  protected getClassCharacter(character: string): string {
    return POINTERS.includes(character)
      ? `${CLASS_BASE}__pointer`
      : `${CLASS_BASE}__char`;
  }
}
