import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {
  LibAutoFocusDirective,
  provideControlValueAccessor,
} from '@libs/lib-core';
import { LibBaseController } from '../../directives/base-controller.directive';
import { LibLabelComponent } from '../label/label.component';

@Component({
  imports: [
    FormsModule,
    MatInput,
    MatFormFieldModule,
    LibLabelComponent,
    LibAutoFocusDirective,
  ],
  selector: 'lib-text-input',
  templateUrl: './text-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideControlValueAccessor(LibTextInputComponent)],
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
export class LibTextInputComponent extends LibBaseController<string> {
  override placeholder = input<string>('');
  override label = input<string>('');
  override autoFocus = input(false, { transform: booleanAttribute });

  type = input<'input' | 'textarea'>('input');
  rows = input<number>(5);
}
