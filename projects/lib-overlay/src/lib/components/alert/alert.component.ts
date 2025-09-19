import {
  ChangeDetectionStrategy,
  Component,
  input,
  Signal,
} from '@angular/core';

export interface IAlertComponent {
  title?: string | Signal<string>;
  message?: string | Signal<string>;
}

@Component({
  selector: 'lib-alert',
  templateUrl: './alert.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent implements IAlertComponent {
  title = input<string>('Update Completed Successfully');
  message = input<string>(
    'Your system has been updated to version 2.12.0. All services are running normally.'
  );
}
