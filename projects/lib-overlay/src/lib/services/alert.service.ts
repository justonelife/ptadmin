import { inject, Injectable } from '@angular/core';
import { ALERT_COMPONENT } from '../di/alert.di';
import { Overlay, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

export interface IAlertService {
  success(message: string, title: string): void;
}

@Injectable({ providedIn: 'root' })
export class LibAlertService implements IAlertService {
  component = inject(ALERT_COMPONENT);
  overlay = inject(Overlay);
  positionBuilder = inject(OverlayPositionBuilder);

  constructor() {
    console.log(this.component);
  }

  //TODO: add string | TemplateRef
  success(message = '', title = 'Success'): void {
    console.log(message);
    console.log(this.overlay);

    const overlayRef = this.overlay.create({
      positionStrategy: this.positionBuilder.global().top().right(),
    });

    const alertPortal = new ComponentPortal(this.component);

    const alertRef = overlayRef.attach(alertPortal);
    alertRef.setInput('title', title);
    alertRef.setInput('message', 'Custom message');

    // console.log(this.host);
  }
}
