import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TABS } from '@features/system-settings/data-access';
import { LibTabsComponent } from '@libs/lib-tabs';

@Component({
  imports: [LibTabsComponent],
  selector: 'app-system-settings-shell',
  templateUrl: './shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {
  readonly TABS = TABS;
}
