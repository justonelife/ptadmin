import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {
  Config,
  KeyPipe,
  LANGUAGES,
} from '@features/mail-template-editor/data-access';
import { LibButtonComponent } from '@libs/lib-button';
import { LibCardComponent } from '@libs/lib-card';
import { LibChipComponent } from '@libs/lib-chip';
import {
  LibSelectComponent,
  LibTextInputComponent,
} from '@libs/lib-controller';
import {
  LibIconPositionDirective,
  LibTypedForm,
  OnChangeType,
  OnTouchedType,
  provideControlValueAccessor,
} from '@libs/lib-core';
import { tap } from 'rxjs';

@Component({
  selector: 'app-mail-template-variables-config',
  templateUrl: './variables-config.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LibCardComponent,
    LibIconPositionDirective,
    LibTextInputComponent,
    LibButtonComponent,
    LibSelectComponent,
    FormsModule,
    LibChipComponent,
    ReactiveFormsModule,
    MatIconModule,
    KeyPipe,
  ],
  host: {
    class: 'mt-6 block pb-6 px-1 space-y-6',
  },
  providers: [provideControlValueAccessor(VariablesConfigComponent)],
})
export class VariablesConfigComponent implements ControlValueAccessor {
  readonly cdr = inject(ChangeDetectorRef);
  readonly LANGUAGES = LANGUAGES;
  languages = new Set<string>();
  selectedLanguage = '';

  variables = new Set<string>();
  newVariable = '';

  onChange: OnChangeType = () => null;

  onTouched: OnTouchedType = () => null;

  form: LibTypedForm<Config> = new FormGroup({
    languages: new FormControl<string[]>([], { nonNullable: true }),
    variables: new FormGroup({}),
  });

  get variablesFormGroup() {
    return this.form.controls.variables as FormGroup;
  }

  //NOTE: two way
  // tempState: Config = {};

  constructor() {
    this.form.valueChanges
      .pipe(
        tap((value) => {
          console.log(value);
          this.onChange(value);
        }),
        takeUntilDestroyed()
      )
      .subscribe();
  }

  addLanguage(): void {
    if (!this.selectedLanguage) return;
    this.languages.add(this.selectedLanguage);
    this.addLanguageToExistingVariables(this.selectedLanguage);
    this.selectedLanguage = '';
    this.form.controls.languages.setValue([...this.languages]);
    this.cdr.markForCheck();
  }

  removeLanguage(language: string): void {
    this.languages.delete(language);
    this.form.controls.languages.setValue([...this.languages]);
    this.removeLanguageToExistingVariables(language);
  }

  addVariable(): void {
    if (!this.newVariable) return;
    // this.variables.add(this.newVariable);
    this.variablesFormGroup.addControl(
      this.newVariable,
      new FormGroup(
        [...this.languages].reduce(
          (acc, cur) => ({
            ...acc,
            [cur]: new FormControl(''),
          }),
          {}
        )
      )
    );

    this.newVariable = '';
  }

  writeValue(value: Config): void {
    // debugger
    if (!value) return;

    Object.keys(this.variablesFormGroup.controls).forEach((key) => {
      this.variablesFormGroup.removeControl(key);
    });

    Object.entries(value.variables).forEach(([variable, v]) => {
      const obj = v as Record<string, string>;
      this.variablesFormGroup.addControl(
        variable,
        new FormGroup(
          Object.entries(obj).reduce(
            (acc, [k, kv]) => ({ ...acc, [k]: new FormControl(kv) }),
            {}
          )
        )
      );
      console.log(variable, value);
    });

    //
    this.form.patchValue(value);
    console.log(this.form.value);
    // this.tempState = value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: OnChangeType): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: OnTouchedType): void {
    this.onTouched = fn;
  }

  private addLanguageToExistingVariables(language: string): void {
    Object.keys(this.variablesFormGroup.controls).forEach((key) => {
      const group = this.variablesFormGroup.get(key) as FormGroup;
      group.addControl(language, new FormControl(''));
    });
  }

  private removeLanguageToExistingVariables(language: string): void {
    Object.keys(this.variablesFormGroup).forEach((key) => {
      const group = this.variablesFormGroup.get(key) as FormGroup;
      group.removeControl(language);
    });
  }

  getVariableForm(variable: string) {
    return this.variablesFormGroup.get(variable) as FormGroup;
  }
}
