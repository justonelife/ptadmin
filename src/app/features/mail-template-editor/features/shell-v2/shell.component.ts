import { ChangeDetectionStrategy, Component } from '@angular/core';
import { STEPS } from '@features/mail-template-editor/data-access';
import { StepComponent } from '@features/mail-template-editor/ui/step/step.component';
import { LibButtonComponent } from '@libs/lib-button';
import { LibCardComponent } from '@libs/lib-card';
import { LanguagesManagerComponent } from '../languages-manager/languages-manager.component';

@Component({
  selector: 'app-mail-template-editor-shell-v2',
  templateUrl: './shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    StepComponent,
    LibCardComponent,
    LibButtonComponent,
    LanguagesManagerComponent,
  ],
})
export class ShellComponent {
  readonly STEPS = STEPS;
}
