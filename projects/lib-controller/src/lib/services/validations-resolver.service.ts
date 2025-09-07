import {
  inject,
  Injectable,
  InjectionToken,
  makeEnvironmentProviders,
} from '@angular/core';
import {
  AbstractControl,
  ValidatorFn,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { LibSafeAny } from '@libs/lib-core';
import {
  DynamicFormBuilderFieldValidation,
  DynamicFormBuilderFieldValidationType,
} from '../types';

export type DynamicFormCustomValidations = Record<
  DynamicFormBuilderFieldValidationType | 'default',
  (data: LibSafeAny) => (control: AbstractControl) => ValidationErrors | null
>;

export const DYNAMIC_FORM_CUSTOM_VALIDATIONS =
  new InjectionToken<DynamicFormCustomValidations>(
    'DYNAMIC_FORM_CUSTOM_VALIDATIONS',
    {
      providedIn: 'root',
      factory: () => {
        return {};
      },
    }
  );

export function provideCustomValidators(mapper: DynamicFormCustomValidations) {
  return makeEnvironmentProviders([
    {
      provide: DYNAMIC_FORM_CUSTOM_VALIDATIONS,
      useValue: mapper,
    },
  ]);
}

@Injectable({ providedIn: 'root' })
export class ValidationsResolverService {
  readonly customValidations = inject(DYNAMIC_FORM_CUSTOM_VALIDATIONS);

  private validationStrategies: DynamicFormCustomValidations = {
    min: (data: number) => {
      return Validators.min(data);
    },
    required: () => Validators.required,
    default: () => () => null,
    ...this.customValidations,
  };

  resolve(validation: DynamicFormBuilderFieldValidation): ValidatorFn {
    return (
      this.validationStrategies[validation.type] ||
      this.validationStrategies['default']
    )(validation.data);
  }
}
