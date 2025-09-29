import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LibButtonComponent } from '@libs/lib-button';
import {
  LibLabelComponent,
  LibSelectComponent,
  Option,
} from '@libs/lib-controller';
import { LibIconPositionDirective } from '@libs/lib-core';

@Component({
  selector: 'app-mail-template-preview',
  templateUrl: './preview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LibIconPositionDirective,
    LibButtonComponent,
    LibSelectComponent,
    LibLabelComponent,
    FormsModule,
  ],
  host: {
    class: 'space-y-4',
  },
})
export class PreviewComponent {
  readonly OPTIONS: Option<string>[] = [
    {
      label: 'German',
      value: 'de',
    },
    {
      label: 'English',
      value: 'en',
    },
    {
      label: 'Chinese',
      value: 'zh',
    },
  ];

  selectedLanguage = 'en';
}
