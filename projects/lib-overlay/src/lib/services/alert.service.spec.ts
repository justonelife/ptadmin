import {
  Component,
  input,
  output,
  provideZonelessChangeDetection,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { IAlertComponent } from '../components/alert/alert.component';
import { ALERT_COMPONENT, LIB_OVERLAY_CONFIG } from '../di/alert.di';
import { AlertConfig } from '../types/config';
import { LibAlertService } from './alert.service';

@Component({})
class MockAlertComponent implements IAlertComponent {
  title = input<string>('');
  message = input<string>('');
  emitClose = output();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  close(): void {}
}

describe('it should test LibAlertService', () => {
  let service: LibAlertService;

  const libOverlayConfig: AlertConfig = {
    lifetime: 2_000,
    icon: 'info',
    appearance: 'raised',
    error: {
      icon: 'cancel',
    },
    success: {
      icon: 'check_circle',
    },
    warning: {
      icon: 'warning',
    },
  };

  beforeEach(() => {
    service = TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        { provide: LIB_OVERLAY_CONFIG, useValue: libOverlayConfig },
        { provide: ALERT_COMPONENT, useClass: MockAlertComponent },
      ],
    }).inject(LibAlertService);
  });

  it('it should create alert service', () => {
    expect(service).toBeTruthy();
  });
});
