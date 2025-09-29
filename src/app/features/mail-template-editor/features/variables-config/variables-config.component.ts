import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LANGUAGES } from '@features/mail-template-editor/data-access/constants/languages';
import { LibButtonComponent } from '@libs/lib-button';
import { LibCardComponent } from '@libs/lib-card';
import { LibChipComponent } from '@libs/lib-chip';
import {
  LibSelectComponent,
  LibTextInputComponent,
} from '@libs/lib-controller';
import { LibIconPositionDirective } from '@libs/lib-core';

@Component({
  selector: 'app-mail-template-variables-config',
  templateUrl: './variables-config.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LibCardComponent,
    LibIconPositionDirective,
    LibTextInputComponent,
    LibButtonComponent,
    LibSelectComponent,
    FormsModule,
    LibChipComponent,
  ],
  host: {
    class: 'mt-6 block pb-6 px-1 space-y-6',
  },
})
export class VariablesConfigComponent {
  readonly LANGUAGES = LANGUAGES;
  languages = new Set<string>();
  selectedLanguage = '';

  variables = new Set<string>();
  selectedVariable = '';

  addLanguage(): void {
    if (!this.selectedLanguage) return;
    this.languages.add(this.selectedLanguage);
    this.selectedLanguage = '';
  }

  addVariable(): void {
    if (!this.selectedVariable) return;
    this.variables.add(this.selectedVariable);
    this.selectedVariable = '';
  }
}
