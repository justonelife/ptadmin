import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { LibBaseController } from '../../directives/base-controller.directive';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideControlValueAccessor } from '@libs/lib-core';

@Component({
  imports: [FormsModule, MatInput, MatFormFieldModule],
  selector: 'lib-number-input',
  templateUrl: './number-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideControlValueAccessor(LibNumberInputComponent)],
  styles: [
    `
      :host ::ng-deep {
        .mat-mdc-form-field-subscript-wrapper {
          display: none;
        }
      }
    `,
  ], //TODO: check what is subscript wrapper
})
export class LibNumberInputComponent extends LibBaseController<number> {
  override placeholder = input<string>('');
  override label = input<string>('');

  min = input<number | null>(null);
  max = input<number | null>(null);
}
