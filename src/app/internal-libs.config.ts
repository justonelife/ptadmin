import { EnvironmentProviders, Provider } from '@angular/core';
import {
  provideComponentControlResolver,
  provideCustomValidators,
  provideRecordErrorMessages,
} from '@libs/lib-controller';
import {
  banValueValidator,
  banWordsValidator,
} from '@shared/data-access/utils';
import {
  AppDynamicType,
  GenderSelectResolver,
} from '@shared/data-access/types';

export const internalLibsProviders: (Provider | EnvironmentProviders)[] = [
  provideComponentControlResolver<AppDynamicType>([GenderSelectResolver]),
  provideRecordErrorMessages({
    required: 'This field is required!',
    min: ({ min }: { min: { min: number; actual: number } }) =>
      `Expected at least ${min.min}, but got ${min.actual}`,
    banwords: ({ banwords }: { banwords: string }) =>
      `Contain banned word ${banwords}`,
    banvalue: 'This value be banned',
  }),
  provideCustomValidators({
    banwords: banWordsValidator,
    banvalue: banValueValidator,
  }),
];
