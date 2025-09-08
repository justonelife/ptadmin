import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VersionCardViewComponent } from '@features/system-settings/ui/version-card/version-card.component';

@Component({
  imports: [
    VersionCardViewComponent,
  ],
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralSettingsComponent {
}

const mock = {
  "api": "3.45.1",
  "service": [
    { "name": "DBConnector", "version": "20250908-02-PTv2" },
    { "name": "DXConnector", "version": "20250904-02-PTv2" },
    { "name": "Mailer", "version": "20250906-02-PTv2" },
    { "name": "RulesEngine", "version": "20250909-02-PTv2" },
    { "name": "Scheduler", "version": "20250829-02-PTv2" },
    { "name": "MT5Connector", "version": "20250909-04-PTv2" },
    { "name": "TLConnector", "version": "20250904-02-PTv2" }
  ],
  "tlVersion": "2508028-07-TL-SVC-X64-NET9LINUX",
  "portal": "2.12.0",
  "admin": "2.11.8"
}
