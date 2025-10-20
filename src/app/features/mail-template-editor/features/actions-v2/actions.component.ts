import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  MailTemplateEditorService,
  STEPS,
} from '@features/mail-template-editor/data-access';
import { LibButtonComponent } from '@libs/lib-button';

@Component({
  imports: [LibButtonComponent],
  selector: 'app-mail-template-editor-actions-v2',
  template: `
    <button lib-button icon="file_export" iconSet="outlined">
      Export JSON
    </button>
    <button lib-button icon="place_item" iconSet="outlined">Import JSON</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex gap-2 items-center',
  },
})
export class ActionsComponent {
  service = inject(MailTemplateEditorService);

  readonly STEPS = STEPS;

  generate() {
    this.service.generate();
  }
}
