import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  LIB_CLASS_MERGER_SOURCES,
  LibAppearanceDirective,
  LibClassMergerDirective,
  LibIconPositionDirective,
  LibSeverityDirective,
} from '@libs/lib-core';

@Component({
  //FIXME: set lint-staged in package.json to max-warnings=0
  /* eslint-disable @angular-eslint/component-selector */
  selector: 'a[lib-button], button[lib-button]',
  template: `
    <ng-content />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      inputs: ['libSeverity:severity'],
      directive: LibSeverityDirective,
    },
    {
      inputs: ['libIconPosition', 'icon', 'iconSet'],
      directive: LibIconPositionDirective,
    },
    {
      directive: LibAppearanceDirective,
      inputs: ['libAppearance:appearance'],
    },
    LibClassMergerDirective,
  ],
  host: {
    class:
      'cursor-pointer inline-flex items-center justify-center p-1 px-4 font-semibold h-[32px] text-md rounded-md',
  },
  providers: [
    {
      provide: LIB_CLASS_MERGER_SOURCES,
      useValue: ['severity-class', 'appearance-class', 'button-class', 'class'],
    },
  ],
})
export class LibButtonComponent {}
