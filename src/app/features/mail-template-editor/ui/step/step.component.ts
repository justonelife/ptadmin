import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LibIconPositionDirective } from '@libs/lib-core';

@Component({
  selector: 'app-mail-template-step',
  template: `
    <div>
      <span>Step {{ index() }}:</span>
      <span class="text-sm text-white">{{ title() }}</span>
      <br />
      <span>{{ subTitle() }}</span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: LibIconPositionDirective,
      inputs: ['libIconPosition:position', 'icon', 'iconSet'],
    },
  ],
  host: {
    class:
      'text-xs fg-secondary cursor-pointer bg-slate-800/20 hover:bg-gray-900 px-4 p-2 rounded-md',
  },
})
export class StepComponent {
  title = input<string | undefined>('');
  subTitle = input<string | undefined>('');
  index = input<number | null>(null);
}
