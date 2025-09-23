import {
  forwardRef,
  InjectionToken,
  makeEnvironmentProviders,
  Type,
} from '@angular/core';
import {
  LibAlertComponent,
  IAlertComponent,
} from '../components/alert/alert.component';
import { AlertConfig } from '../types/config';

export const ALERT_COMPONENT = new InjectionToken<Type<IAlertComponent>>(
  'ALERT_COMPONENT',
  {
    providedIn: 'root',
    factory: () => LibAlertComponent,
  }
);

export function provideAlertComponent(component: IAlertComponent) {
  return makeEnvironmentProviders([
    {
      provide: ALERT_COMPONENT,
      useFactory: forwardRef(() => component),
    },
  ]);
}

export const LIB_OVERLAY_CONFIG = new InjectionToken<AlertConfig>(
  'LIB_OVERLAY_GLOBAL_CONFIG',
  {
    providedIn: 'root',
    factory: () => ({
      lifetime: 5_000,
      icon: 'info',
      error: {
        lifetime: null,
        icon: 'cancel',
      },
      success: {
        icon: 'check_circle',
      },
      warning: {
        icon: 'warning',
      },
    }),
  }
);
