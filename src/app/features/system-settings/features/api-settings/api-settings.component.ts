import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-api-settings',
  templateUrl: './api-settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiSettingsComponent {
  constructor() {
    console.log('api init');
  }
}
