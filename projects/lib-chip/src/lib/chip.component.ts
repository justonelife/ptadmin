import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  LIB_CLASS_MERGER_SOURCES,
  LibAppearanceDirective,
  LibClassMergerDirective,
  LibIconPositionDirective,
  LibSeverityDirective,
} from '@libs/lib-core';

@Component({
  selector: 'lib-chip',
  template: `
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      inputs: ['libSeverity:severity'],
      directive: LibSeverityDirective,
    },
    {
      directive: LibAppearanceDirective,
      inputs: ['libAppearance:appearance'],
    },
    LibClassMergerDirective,
    {
      inputs: ['libIconPosition:iconPosition', 'icon', 'iconSet'],
      directive: LibIconPositionDirective,
    },
  ],
  host: {
    class: `rounded-full px-2.5 py-0.5 text-xs font-semibold`,
  },
  providers: [
    {
      provide: LIB_CLASS_MERGER_SOURCES,
      useValue: ['severity-class', 'appearance-class', 'class'],
    },
  ],
})
export class LibChipComponent {}
