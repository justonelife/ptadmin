import { Type, ExistingProvider, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

export const provideControlValueAccessor = (
  component: Type<unknown>
): ExistingProvider => ({
  provide: NG_VALUE_ACCESSOR,
  multi: true,
  useExisting: forwardRef(() => component),
});
