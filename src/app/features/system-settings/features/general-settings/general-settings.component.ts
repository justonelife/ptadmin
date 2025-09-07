import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-general',
  templateUrl: './general-settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralSettingsComponent {
  constructor() {
    console.log('init');
  }
}
