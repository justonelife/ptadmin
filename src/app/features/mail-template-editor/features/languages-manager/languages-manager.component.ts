import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LANGUAGES } from '@features/mail-template-editor/data-access';
import { LibButtonComponent } from '@libs/lib-button';
import { LibCardComponent } from '@libs/lib-card';

@Component({
  selector: 'app-mail-template-languages-manager',
  templateUrl: './languages-manager.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LibCardComponent, LibButtonComponent],
})
export class LanguagesManagerComponent {
  readonly LANGUAGES = LANGUAGES;
}
