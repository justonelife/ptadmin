import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LibButtonComponent } from '@libs/lib-button';

@Component({
  imports: [LibButtonComponent],
  selector: 'app-system-settings-actions',
  template: `
    <button lib-button variant="outlined" icon="sync" iconSet="outlined">
      Check Updates
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsViewComponent {}
