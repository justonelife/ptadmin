import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { LibCardComponent } from '@libs/lib-card';
import { LibChipComponent } from '@libs/lib-chip';
import { LibIconPositionDirective } from '@libs/lib-core';

interface BackendService {
  name: string;
  version: string;
}

@Component({
  imports: [LibCardComponent, LibIconPositionDirective, LibChipComponent],
  selector: 'app-backend-services-card-view',
  templateUrl: './backend-services-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackendServicesCardViewComponent {
  services = signal<BackendService[]>([
    { name: 'DBConnector', version: '20250908-02-PTv2' },
    { name: 'DXConnector', version: '20250904-02-PTv2' },
    { name: 'Mailer', version: '20250906-02-PTv2' },
    { name: 'RulesEngine', version: '20250909-02-PTv2' },
    { name: 'Scheduler', version: '20250829-02-PTv2' },
    { name: 'MT5Connector', version: '20250909-04-PTv2' },
    { name: 'TLConnector', version: '20250904-02-PTv2' },
  ]);
}
