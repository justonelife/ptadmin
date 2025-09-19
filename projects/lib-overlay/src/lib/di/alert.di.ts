import {
  forwardRef,
  InjectionToken,
  makeEnvironmentProviders,
  Type,
} from '@angular/core';
import {
  AlertComponent,
  IAlertComponent,
} from '../components/alert/alert.component';

export const ALERT_COMPONENT = new InjectionToken<Type<IAlertComponent>>(
  'ALERT_COMPONENT',
  {
    providedIn: 'root',
    factory: () => AlertComponent,
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
