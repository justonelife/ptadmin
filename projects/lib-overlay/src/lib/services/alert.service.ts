import { ComponentRef, inject, Injectable } from '@angular/core';
import { ALERT_COMPONENT } from '../di/alert.di';
import { Overlay, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { IAlertComponent } from '../components/alert/alert.component';
import { LibSeverity } from '@libs/lib-core';

export interface IAlertService {
  success(message: string, title: string): void;
}

@Injectable({ providedIn: 'root' })
export class LibAlertService implements IAlertService {
  //TODO: custom ALERT_COMPONENT should have hostDirective like the default one.
  component = inject(ALERT_COMPONENT);
  overlay = inject(Overlay);
  positionBuilder = inject(OverlayPositionBuilder);

  overlayRef = this.overlay.create({
    positionStrategy: this.positionBuilder.global().top('10px').right('10px'),
  });

  //TODO: add string | TemplateRef
  success(message = 'Successfully!', title = 'Success'): void {
    const alertRef = this.buildAlertRef('success');

    alertRef.setInput('title', title);
    alertRef.setInput('message', message);
  }

  private buildAlertRef(severity: LibSeverity): ComponentRef<IAlertComponent> {
    return this.configBySeverity(this.buildBaseAlertRef(), severity);
  }

  private buildBaseAlertRef(): ComponentRef<IAlertComponent> {
    const alertPortal = new ComponentPortal(this.component);
    const alertRef = this.overlayRef.attach(alertPortal);
    alertRef.setInput('appearance', 'soft');
    alertRef.setInput('iconSet', 'outlined');
    return alertRef;
  }

  private configBySeverity(
    alertRef: ComponentRef<IAlertComponent>,
    severity: LibSeverity
  ): ComponentRef<IAlertComponent> {
    alertRef.setInput('severity', severity);
    switch (severity) {
      case 'success':
        alertRef.setInput('icon', 'check_circle');
        break;

      case 'danger':
        alertRef.setInput('icon', 'cancel');
        break;
      default:
        alertRef.setInput('icon', 'info');
    }
    return alertRef;
  }
}
