import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LibIconPositionDirective, SeverityDirective } from '@libs/lib-core';

@Component({
  selector: 'lib-chip',
  template: `
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      inputs: ['severity'],
      directive: SeverityDirective,
    },
    {
      inputs: ['libIconPosition:iconPosition', 'icon', 'iconSet'],
      directive: LibIconPositionDirective,
    },
  ],
  host: {
    class: `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors`,
  },
})
export class LibChipComponent {}
