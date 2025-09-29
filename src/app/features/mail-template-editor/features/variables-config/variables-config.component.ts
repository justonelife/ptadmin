import { JsonPipe } from '@angular/common';
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
import { Config, LANGUAGES } from '@features/mail-template-editor/data-access';
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
    JsonPipe,
    ReactiveFormsModule,
    MatIconModule,
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

  onChange: OnChangeType = (v: Config) => {
    console.log(v);
  };

  onTouched: OnTouchedType = () => null;

  form: LibTypedForm<Config> = new FormGroup({
    languages: new FormControl<string[]>([], { nonNullable: true }),
    variables: new FormGroup({}),
  });

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
    this.variables.add(this.newVariable);
    this.form.controls.variables.addControl(
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
    console.log(value);
    // this.tempState = value;
    // this.cdr.markForCheck();
    // this.form = this.fb.group(
    //   Object.keys(this.config).reduce((acc, variable) => {
    //     acc[variable] = this.fb.group(this.config[variable]);
    //     return acc;
    //   }, {} as Record<string, FormGroup>)
    // );
  }

  registerOnChange(fn: OnChangeType): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: OnTouchedType): void {
    this.onTouched = fn;
  }

  private addLanguageToExistingVariables(language: string): void {
    Object.keys(this.form.controls.variables.controls).forEach((key) => {
      const group = this.form.controls.variables.get(key) as FormGroup;
      group.addControl(language, new FormControl(''));
    });
  }

  private removeLanguageToExistingVariables(language: string): void {
    Object.keys(this.form.controls.variables).forEach((key) => {
      const group = this.form.controls.variables.get(key) as FormGroup;
      group.removeControl(language);
    });
  }

  getVariableForm(variable: string) {
    return this.form.controls.variables.get(variable) as FormGroup;
  }
}
