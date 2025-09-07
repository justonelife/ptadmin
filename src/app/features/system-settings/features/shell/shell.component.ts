import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TABS } from '@features/system-settings/data-access';
import { LibTabsModule } from '@libs/lib-tabs';

@Component({
  imports: [RouterOutlet, LibTabsModule],
  selector: 'app-system-settings-shell',
  templateUrl: './shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {
  readonly TABS = TABS;
}
