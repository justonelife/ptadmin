import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import {
  Config,
  KeyPipe,
  MailTemplateEditorService,
  PreviewResult,
} from '@features/mail-template-editor/data-access';
import { LibTabItem, LibTabsModule } from '@libs/lib-tabs';
import { tap } from 'rxjs';
import { PreviewComponent } from '../preview/preview.component';
import { TemplateEditorComponent } from '../template-editor/template-editor.component';
import { VariablesConfigComponent } from '../variables-config/variables-config.component';

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
    FormsModule,
    KeyPipe,
    JsonPipe,
  ],
})
export class ShellComponent {
  readonly service = inject(MailTemplateEditorService);
  readonly cdr = inject(ChangeDetectorRef);

  readonly TABS = TABS;

  template = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Welcome Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #2563eb;">Hello {{firstName}}!</h1>
        <a href="{login_link}" target="_blank">Login</a>
        <p>Welcome to {{companyName}}. We're excited to have you on board.</p>
        <p>Best regards,<br>The {{companyName}} Team</p>
    </div>
</body>
</html>`;

  config: Config = {
    languages: [],
    variables: {},
  };
  result: PreviewResult = {};

  constructor() {
    this.service.generateObs
      .pipe(
        tap(() => {
          this.generate();
        }),
        takeUntilDestroyed()
      )
      .subscribe();
  }

  generate() {
    console.log('generate...');
    this.result = {};
    this.config.languages.forEach((language) => {
      this.result[language] = this.template;
      for (const key in this.config.variables) {
        const value = this.config.variables[key][language];
        // debugger;
        this.result[language] = this.result[language].replace(
          new RegExp(`{{${key}}}`, 'g'),
          value
        );
      }
    });

    this.cdr.markForCheck();
  }
}
