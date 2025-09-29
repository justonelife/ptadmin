import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { PreviewResult } from '@features/mail-template-editor/data-access';
import { LibButtonComponent } from '@libs/lib-button';
import {
  LibLabelComponent,
  LibSelectComponent,
  Option,
} from '@libs/lib-controller';
import { LibIconPositionDirective } from '@libs/lib-core';
import { LibTabItem, LibTabsModule } from '@libs/lib-tabs';

const TABS: LibTabItem[] = [
  {
    label: 'Live Preview',
    value: 'live-preview',
    icon: 'visibility',
  },
  {
    label: 'Code Preview',
    value: 'code-preview',
    icon: 'code',
  },
];

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
    LibTabsModule,
    JsonPipe,
  ],
  host: {
    class: 'space-y-4',
  },
})
export class PreviewComponent {
  readonly sanitizer = inject(DomSanitizer);

  readonly TABS = TABS;
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

  data = input<PreviewResult>();
  test = computed(() => {
    const data = this.data();
    if (data) {
      return this.sanitizer.bypassSecurityTrustHtml(data['en'] || '');
    }
    return '';
  });
}
