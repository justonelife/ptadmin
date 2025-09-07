import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { LibSafeAny } from '@libs/lib-core';

//NOTE: demo
export const banValueValidator = (value: LibSafeAny): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value === value) {
      return {
        banvalue: control.value,
      };
    }
    return null;
  };
};
