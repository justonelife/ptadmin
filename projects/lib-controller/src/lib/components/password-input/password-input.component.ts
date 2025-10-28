import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
  Pipe,
  PipeTransform,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { LibButtonComponent } from '@libs/lib-button';
import { LibBaseController } from '@libs/lib-controller';
import {
  OnValidatorChangeType,
  provideControlValueAccessor,
  provideValidators,
} from '@libs/lib-core';
import { tap } from 'rxjs';

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
    LibButtonComponent,
    LibIconPipe,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './password-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideControlValueAccessor(LibPasswordInputComponent),
    provideValidators(LibPasswordInputComponent),
  ],
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
export class LibPasswordInputComponent
  extends LibBaseController<string>
  implements Validator
{
  override placeholder = input<string>('');
  override label = input<string>('');
  override autoFocus = input(false, { transform: booleanAttribute });

  toggleMask = input(true, { transform: booleanAttribute });

  inputType = signal<InputType>('password');

  mediumRegex = input<RegExp>(
    /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/
  );
  strongRegex = input<RegExp>(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/);

  control = new FormControl<string>('', [
    Validators.pattern(this.mediumRegex()),
    Validators.pattern(this.strongRegex()),
  ]);

  onValidatorChange!: OnValidatorChangeType;

  constructor() {
    super();
    this.control.valueChanges
      .pipe(
        tap((value) => {
          this.onChange(value);
          if (this.onValidatorChange) {
            this.onValidatorChange();
          }
        }),
        takeUntilDestroyed()
      )
      .subscribe();
  }

  toggleInputType(): void {
    this.inputType.update((type) => (type === 'text' ? 'password' : 'text'));
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.mediumRegex().test(control.value)) {
      return {
        invalidMediumPassword: true,
      };
    }
    return this.strongRegex().test(control.value)
      ? null
      : {
          invalidStrongPassword: true,
        };
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  override writeValue(value: string): void {
    this.control.patchValue(value, { emitEvent: false });
  }
}
