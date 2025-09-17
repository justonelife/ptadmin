import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
  Pipe,
  PipeTransform,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { LibButtonComponent } from '@libs/lib-button';
import { LibBaseController } from '@libs/lib-controller';
import { provideControlValueAccessor } from '@libs/lib-core';

type InputType = 'text' | 'password';
type Icon = 'visibility' | 'visibility_off';

@Pipe({
  name: 'libIcon',
})
class LibIconPipe implements PipeTransform {
  mapper: Record<InputType, Icon> = {
    text: 'visibility_off',
    password: 'visibility',
  };
  transform(type: InputType): Icon {
    return this.mapper[type];
  }
}

@Component({
  selector: 'lib-password-input',
  imports: [
    MatFormFieldModule,
    MatInput,
    FormsModule,
    LibButtonComponent,
    LibIconPipe,
    MatIconModule,
  ],
  templateUrl: './password-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideControlValueAccessor(LibPasswordInputComponent)],
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
export class LibPasswordInputComponent extends LibBaseController<string> {
  override placeholder = input<string>('');
  override label = input<string>('');

  toggleMask = input(true, { transform: booleanAttribute });

  inputType = signal<InputType>('password');

  toggleInputType(): void {
    this.inputType.update((type) => (type === 'text' ? 'password' : 'text'));
  }
}
