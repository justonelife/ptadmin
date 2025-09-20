import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LibButtonComponent } from '@libs/lib-button';

@Component({
  imports: [LibButtonComponent],
  selector: 'app-system-settings-actions',
  template: `
    <button
      lib-button
      appearance="outlined"
      severity="neutral"
      icon="sync"
      iconSet="outlined"
    >
      Check Updates
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsViewComponent {}
