import { Type, ExistingProvider, forwardRef } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';

export const provideValidators = (
  component: Type<unknown>
): ExistingProvider => ({
  provide: NG_VALIDATORS,
  multi: true,
  useExisting: forwardRef(() => component),
});
