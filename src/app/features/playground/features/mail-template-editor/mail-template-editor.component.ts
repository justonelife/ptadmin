import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-mail-template-editor',
  templateUrl: './mail-template-editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MailTemplateEditorComponent {}
