/* eslint-disable @angular-eslint/component-selector */
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import {
  LIB_CLASS_MERGER_SOURCES,
  LibAppearanceDirective,
  LibClassMergerDirective,
  LibIconPositionDirective,
  LibSeverityDirective,
} from '@libs/lib-core';

type ButtonSize = 'small' | 'medium' | 'large';

@Component({
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
      inputs: ['libIconPosition:position', 'icon', 'iconSet'],
      directive: LibIconPositionDirective,
    },
    {
      directive: LibAppearanceDirective,
      inputs: ['libAppearance:appearance'],
    },
    LibClassMergerDirective,
  ],
  host: {
    '[class]': 'styleClass()',
  },
  providers: [
    {
      provide: LIB_CLASS_MERGER_SOURCES,
      useValue: ['severity-class', 'appearance-class', 'class'],
    },
  ],
})
export class LibButtonComponent {
  readonly SIZE_MAPPER: Record<ButtonSize, string> = {
    small: 'h-[32px] text-xs rounded-md',
    medium: 'h-[40px] text-md rounded-md',
    large: 'h-[52px] text-lg rounded-full',
  };

  size = input<ButtonSize>('small');

  styleClass = computed(() => {
    return `cursor-pointer disabled:cursor-not-allowed
      inline-flex items-center justify-center
      p-1 px-4 font-semibold ${this.SIZE_MAPPER[this.size()]}`;
  });
}
