import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Type,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { LibSeverity } from '@libs/lib-core';
import { v4 as uuidv4 } from 'uuid';
import { ALERT_COMPONENT } from '../../di/alert.di';
import { Alert } from '../../types/alert';
import { IAlertComponent } from '../alert/alert.component';

type UUIDAlert = Alert & {
  uuid: string;
};

@Component({
  selector: 'lib-alerts-container',
  templateUrl: './alerts-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'space-y-2',
  },
})
export class LibAlertsContainerComponent<
  T extends IAlertComponent = IAlertComponent,
> {
  readonly alertComponent = inject<Type<T>>(ALERT_COMPONENT);
  alerts: UUIDAlert[] = [];
  container = viewChild('container', { read: ViewContainerRef });

  pushAlert(alert: Alert, severity: LibSeverity): void {
    const cloneAlert: UUIDAlert = {
      ...alert,
      uuid: uuidv4(),
    };
    this.alerts.push(cloneAlert);

    const alertRef = this.container()?.createComponent(this.alertComponent);
    alertRef?.setInput('title', cloneAlert.title);
    alertRef?.setInput(
      'message',
      alert.message + ' ' + cloneAlert.uuid + ' ' + alert.lifetime
    );
    alertRef?.setInput('appearance', 'soft');
    alertRef?.setInput('closable', cloneAlert.closable);
    alertRef?.setInput('severity', severity);
    alertRef?.setInput('icon', cloneAlert.icon);
    alertRef?.setInput('iconSet', 'outlined');
    alertRef?.setInput('lifetime', cloneAlert.lifetime);

    alertRef?.instance.emitClose.subscribe(() => {
      const index = this.alerts.findIndex(
        (item) => item.uuid === cloneAlert.uuid
      );
      this.container()?.detach(index);
      this.alerts.splice(index, 1);
    });
  }
}
