import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TABS } from '@features/system-settings/data-access';
import { LibTabsModule } from '@libs/lib-tabs';

@Component({
  imports: [LibTabsModule],
  selector: 'app-system-settings-shell',
  templateUrl: './shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {
  readonly TABS = TABS;
}
