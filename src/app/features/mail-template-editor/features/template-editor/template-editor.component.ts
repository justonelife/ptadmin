import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LibCardComponent } from '@libs/lib-card';
import { LibTextInputComponent } from '@libs/lib-controller';
import { LibIconPositionDirective } from '@libs/lib-core';

@Component({
  selector: 'app-mail-template-editor',
  templateUrl: './template-editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LibCardComponent,
    LibIconPositionDirective,
    LibTextInputComponent,
    FormsModule,
  ],
  host: {
    class: 'mt-6 block pb-6 px-1 space-y-6',
  },
})
export class TemplateEditorComponent {
  fakeInput = `<!DOCTYPE html>
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
</html>`;
}
