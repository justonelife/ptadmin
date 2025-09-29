import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LibTabItem, LibTabsModule } from '@libs/lib-tabs';
import { TemplateEditorComponent } from '../template-editor/template-editor.component';
import { VariablesConfigComponent } from '../variables-config/variables-config.component';
import { PreviewComponent } from '../preview/preview.component';

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
  readonly TABS: LibTabItem[] = [
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
}
