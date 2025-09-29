import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LibButtonComponent } from '@libs/lib-button';
import { LibChipComponent } from '@libs/lib-chip';

@Component({
  imports: [LibButtonComponent, LibChipComponent],
  selector: 'app-mail-template-editor-actions',
  template: `
    <lib-chip icon="language" iconSet="outlined" severity="neutral">
      3 languages
    </lib-chip>
    <button lib-button icon="wand_stars" iconSet="outlined">
      Generate for All Languages
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex gap-4 items-center',
  },
})
export class ActionsComponent {}
