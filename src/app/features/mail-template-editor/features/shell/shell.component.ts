import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { LibTabItem, LibTabsModule } from '@libs/lib-tabs';
import { TemplateEditorComponent } from '../template-editor/template-editor.component';
import { VariablesConfigComponent } from '../variables-config/variables-config.component';
import { PreviewComponent } from '../preview/preview.component';

const TABS: LibTabItem[] = [
  {
    label: 'Template Editor',
    value: 'template-editor',
    icon: 'code',
  },
  {
    label: 'Variables',
    value: 'variables',
    icon: 'language',
  },
];

@Component({
  selector: 'app-mail-template-editor-shell',
  templateUrl: './shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LibTabsModule,
    TemplateEditorComponent,
    VariablesConfigComponent,
    PreviewComponent,
  ],
})
export class ShellComponent {
  readonly TABS = TABS;

  template = signal(`<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Welcome Email</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #2563eb;">Hello {{firstName}}!</h1>
            <p>Welcome to {{companyName}}. We're excited to have you on board.</p>
            <p>Best regards,<br>The {{companyName}} Team</p>
        </div>
    </body>
    </html>`);
}
