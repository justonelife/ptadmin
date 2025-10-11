import { KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@features/mail-template-editor/data-access';
import { LibButtonComponent } from '@libs/lib-button';
import { LibCardComponent } from '@libs/lib-card';
import { LibLabelComponent, LibSelectComponent } from '@libs/lib-controller';
import { LibIconPositionDirective, LibOption } from '@libs/lib-core';
import { LibTabItem, LibTabsModule } from '@libs/lib-tabs';
import { LibButtonToggleComponent } from '@libs/lib-button-toggle';

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

export const VIEW_OPTIONS: LibOption<'mobile' | 'desktop'>[] = [
  {
    value: 'mobile',
    label: 'Mobile',
  },
  {
    value: 'desktop',
    label: 'Desktop',
  },
];

@Component({
  selector: 'app-mail-template-live-preview',
  templateUrl: './live-preview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LibCardComponent,
    LibButtonComponent,
    KeyValuePipe,
    LibIconPositionDirective,
    LibSelectComponent,
    LibLabelComponent,
    LibTabsModule,
    LibButtonToggleComponent,
  ],
})
export class LivePreviewComponent {
  store = inject(Store);

  readonly TABS = TABS;
  readonly VIEWPORTS = VIEW_OPTIONS;
}
