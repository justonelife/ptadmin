import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { LibBaseController } from '../../directives/base-controller.directive';
import { FormsModule } from '@angular/forms';
import { provideControlValueAccessor } from '@libs/lib-core';

@Component({
  imports: [MatFormFieldModule, MatChipsModule, MatIconModule, FormsModule],
  selector: 'lib-chips-input',
  templateUrl: './chips-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host ::ng-deep {
        .mat-mdc-form-field-subscript-wrapper {
          display: none;
        }
      }
    `,
  ],
  providers: [provideControlValueAccessor(LibChipsInputComponent)],
})
export class LibChipsInputComponent extends LibBaseController<string[]> {
  override placeholder = input<string>('');
  override label = input<string>('');
  override state: string[] = [];

  override writeValue(value: string[]): void {
    this.state = [...value];
    this.cdr.markForCheck();
  }

  addItem(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value !== '' && !this.state.includes(value)) {
      this.state = [...this.state, value];
    }
    event.chipInput.clear();
    this.onChange(this.state);
  }
}
