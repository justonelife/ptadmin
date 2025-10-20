import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { STEPS, Store } from '@features/mail-template-editor/data-access';
import { StepComponent } from '@features/mail-template-editor/ui/step/step.component';
import { LibButtonComponent } from '@libs/lib-button';
import { LibCardComponent } from '@libs/lib-card';
import { LanguagesManagerComponent } from '../languages-manager/languages-manager.component';
import { VariablesManagerComponent } from '../variables-manager/variables-manager.component';

import { LivePreviewComponent } from '../live-preview/live-preview.component';

@Component({
  selector: 'app-mail-template-editor-shell-v2',
  templateUrl: './shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    StepComponent,
    LibCardComponent,
    LibButtonComponent,
    LanguagesManagerComponent,
    VariablesManagerComponent,
    LivePreviewComponent,
  ],
})
export class ShellComponent {
  readonly store = inject(Store);
  readonly STEPS = STEPS;
}
