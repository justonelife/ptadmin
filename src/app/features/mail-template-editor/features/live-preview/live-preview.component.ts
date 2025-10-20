import { KeyValuePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import {
  getLanguageLabel,
  HtmlMinifyPipe,
  HtmlSyntaxHighlightPipe,
  SafeHtmlPipe,
  Store,
} from '@features/mail-template-editor/data-access';
import { LibButtonComponent } from '@libs/lib-button';

import { ClipboardModule } from '@angular/cdk/clipboard';
import { FormsModule } from '@angular/forms';
import { LibCardComponent } from '@libs/lib-card';
import {
  LibSelectComponent,
  LibTextInputComponent,
} from '@libs/lib-controller';
import { LibIconPositionDirective, LibOption } from '@libs/lib-core';
import { LibAlertService } from '@libs/lib-overlay';
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
  selector: 'app-mail-template-live-preview',
  templateUrl: './live-preview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LibButtonComponent,
    LibIconPositionDirective,
    LibSelectComponent,
    LibTabsModule,
    LibTextInputComponent,
    FormsModule,
    LibCardComponent,
    KeyValuePipe,
    HtmlSyntaxHighlightPipe,
    SafeHtmlPipe,
    HtmlMinifyPipe,
    ClipboardModule,
  ],
})
export class LivePreviewComponent {
  store = inject(Store);
  cdr = inject(ChangeDetectorRef);
  alertService = inject(LibAlertService);

  readonly TABS = TABS;

  mailTemplate = '';

  preview = signal<Record<string, string>>({});
  selectedLanguage = 'en';

  languageOptions = computed(() => {
    return this.store.languages().reduce(
      (acc, languageCode) => [
        ...acc,
        {
          label: getLanguageLabel(languageCode),
          value: languageCode,
        } as LibOption,
      ],
      [] as LibOption[]
    );
  });

  constructor() {
    effect(() => {
      this.mailTemplate = this.store.mailTemplate();
      this.cdr.markForCheck();
    });
  }

  generatePreviewAllLanguages(): void {
    const _languages = this.store.languages();
    const _variables = this.store.variables();

    this.preview.set(
      _languages.reduce((acc, lang) => {
        let mailTemplate = this.mailTemplate;
        Object.entries(_variables).forEach(([variable, value]) => {
          mailTemplate = mailTemplate.replaceAll(
            `{{${variable}}}`,
            value[lang]
          );
        });
        return {
          ...acc,
          [lang]: mailTemplate,
        };
      }, {})
    );
  }

  previewCopied(): void {
    this.alertService.info({ title: 'Info', message: 'Copied!' });
  }
}
