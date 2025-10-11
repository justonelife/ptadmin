import { KeyValuePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  SearchVariablePipe,
  Store,
  VariableCardCountCompletedPipe,
  VariableCardLanguageInputs,
  VariableCardSeverityPipe,
} from '@features/mail-template-editor/data-access';
import { LibButtonComponent } from '@libs/lib-button';
import { LibCardComponent } from '@libs/lib-card';
import {
  LibControllerWrapperComponent,
  LibDynamicFormComponent,
  LibTextInputComponent,
} from '@libs/lib-controller';
import {
  LibAppearanceDirective,
  LibClassMergerDirective,
  LibHighLightPipe,
  LibIconPositionDirective,
  LibSeverityDirective,
} from '@libs/lib-core';
import { tap } from 'rxjs';

const snakeCaseValidator: ValidatorFn = (control): ValidationErrors | null => {
  return /^[\w_]+$/.test(control.value as string) ? null : { snakeCase: false };
};

@Component({
  selector: 'app-mail-template-variables-manager',
  templateUrl: './variables-manager.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LibButtonComponent,
    LibTextInputComponent,
    LibCardComponent,
    LibIconPositionDirective,
    LibSeverityDirective,
    LibClassMergerDirective,
    LibAppearanceDirective,
    LibDynamicFormComponent,
    ReactiveFormsModule,
    VariableCardSeverityPipe,
    VariableCardCountCompletedPipe,
    LibControllerWrapperComponent,
    FormsModule,
    KeyValuePipe,
    SearchVariablePipe,
    LibHighLightPipe,
    VariableCardLanguageInputs,
  ],
})
export class VariablesManagerComponent {
  readonly store = inject(Store);
  readonly cdr = inject(ChangeDetectorRef);

  showAddForm = false;
  variableControl = new FormControl<string>('', {
    validators: [Validators.required, snakeCaseValidator],
    nonNullable: true,
  });
  search = '';

  parentForm = new FormGroup({});

  constructor() {
    effect(() => {
      const variables = this.store.variables();

      Object.entries(variables).forEach(([variable, value]) => {
        this.parentForm.addControl(
          variable,
          this.generateLanguagesForm(value),
          { emitEvent: false }
        );
      });
    });

    this.parentForm.valueChanges
      .pipe(
        tap((value) => {
          this.store.updateVariables(value);
          this.cdr.markForCheck();
        }),
        takeUntilDestroyed()
      )
      .subscribe();
  }

  onAddVariable(): void {
    this.store.addVariable(this.variableControl.value);
    this.variableControl.reset();
  }

  private generateLanguagesForm(value: Record<string, string>): FormGroup {
    return new FormGroup(
      Object.entries(value).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: new FormControl<string>(value),
        }),
        {}
      )
    );
  }

  getForm(key: string): FormGroup {
    return this.parentForm.get(key) as FormGroup;
  }
}
