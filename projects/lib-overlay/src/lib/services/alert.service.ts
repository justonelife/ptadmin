import { Overlay, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, inject, Injectable } from '@angular/core';
import { LibSeverity } from '@libs/lib-core';
import { LibAlertsContainerComponent } from '../components/alerts-container/alerts-container.component';
import { ALERT_COMPONENT, LIB_OVERLAY_CONFIG } from '../di/alert.di';
import { Alert } from '../types/alert';
import { AlertConfig } from '../types/config';

export interface IAlertService {
  success(alert: Alert): void;
}

@Injectable({ providedIn: 'root' })
export class LibAlertService implements IAlertService {
  //TODO: custom ALERT_COMPONENT should have hostDirective like the default one.
  component = inject(ALERT_COMPONENT);
  config = inject(LIB_OVERLAY_CONFIG);
  overlay = inject(Overlay);
  positionBuilder = inject(OverlayPositionBuilder);

  overlayRef = this.overlay.create({
    positionStrategy: this.positionBuilder.global().top('10px').right('10px'),
  });

  containerPortal: ComponentPortal<LibAlertsContainerComponent> | null = null;
  containerRef!: ComponentRef<LibAlertsContainerComponent>;

  //TODO: add string | TemplateRef
  success(
    alert: Alert = {
      message: 'Successfully',
      title: 'Success',
    }
  ): void {
    const containerRef = this.buildContainerRef();
    containerRef.instance.pushAlert(
      this.computeAlertWithGlobalConfig(alert, this.config, 'success'),
      'success'
    );
  }

  error(
    alert: Alert = {
      message: 'Error',
      title: 'Error',
    }
  ): void {
    const containerRef = this.buildContainerRef();
    containerRef.instance.pushAlert(
      this.computeAlertWithGlobalConfig(alert, this.config, 'error'),
      'error'
    );
  }

  private buildContainerRef(): ComponentRef<LibAlertsContainerComponent> {
    return this.buildBaseAlertRef();
  }

  private buildBaseAlertRef(): ComponentRef<LibAlertsContainerComponent> {
    if (!this.containerPortal) {
      this.containerPortal = new ComponentPortal(LibAlertsContainerComponent);
      this.containerRef = this.overlayRef.attach(this.containerPortal);
    }
    return this.containerRef;
  }

  private computeAlertWithGlobalConfig(
    alert: Alert,
    config: AlertConfig,
    severity: LibSeverity
  ): Alert {
    const severityConfig = config[severity];
    const icon = alert.icon || severityConfig?.icon || config.icon;
    const lifetime =
      alert.lifetime || severityConfig?.lifetime || config.lifetime;
    const title = alert.title || severityConfig?.title || '';
    const message = alert.message || severityConfig?.message;
    const closable = alert.closable || severityConfig?.closable;

    return { icon, lifetime, title, message, closable };
  }
}
