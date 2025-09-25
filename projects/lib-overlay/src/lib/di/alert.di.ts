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

const DEFAULT_CONFIG: AlertConfig = {
  lifetime: 2_000,
  icon: 'info',
  appearance: 'soft',
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
};

export const LIB_OVERLAY_CONFIG = new InjectionToken<AlertConfig>(
  'LIB_OVERLAY_GLOBAL_CONFIG',
  {
    providedIn: 'root',
    factory: () => DEFAULT_CONFIG,
  }
);

export function provideLibAlertServiceConfig(config: AlertConfig) {
  return makeEnvironmentProviders([
    {
      provide: LIB_OVERLAY_CONFIG,
      useValue: { ...DEFAULT_CONFIG, ...config },
    },
  ]);
}
