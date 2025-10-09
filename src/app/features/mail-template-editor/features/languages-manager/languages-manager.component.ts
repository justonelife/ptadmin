import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  LanguageLabelPipe,
  LANGUAGES,
  Store,
} from '@features/mail-template-editor/data-access';
import { LibButtonComponent } from '@libs/lib-button';
import { LibCardComponent } from '@libs/lib-card';
import { LibSelectComponent } from '@libs/lib-controller';

@Component({
  selector: 'app-mail-template-languages-manager',
  templateUrl: './languages-manager.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LibCardComponent,
    LibButtonComponent,
    LanguageLabelPipe,
    LibSelectComponent,
    FormsModule,
  ],
  styleUrl: './languages-manager.component.scss',
})
export class LanguagesManagerComponent {
  readonly store = inject(Store);

  readonly LANGUAGES = LANGUAGES;
  showAddForm = false;
  selectedLanguage = '';

  addLanguage(language: string) {
    this.store.addLanguage(language);
    this.selectedLanguage = '';
  }
}
