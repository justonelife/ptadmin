import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

//NOTE: demo
export const banWordsValidator = (words: string[]): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (words.includes(control.value)) {
      return {
        banwords: control.value,
      };
    }
    return null;
  };
};
