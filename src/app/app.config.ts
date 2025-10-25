import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
} from '@angular/material/form-field';
import { routes } from './app.routes';
import { graphqlConfig } from './graphql.config';
import { IconModule } from './icon.module';
import { internalLibsProviders } from './internal-libs.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
        floatLabel: 'always',
      } as MatFormFieldDefaultOptions,
    },
    importProvidersFrom(IconModule),
    ...internalLibsProviders,
    ...graphqlConfig,
  ],
};
