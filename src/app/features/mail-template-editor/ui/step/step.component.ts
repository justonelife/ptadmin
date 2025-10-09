import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { STEP, Store } from '@features/mail-template-editor/data-access';
import { LibIconPositionDirective } from '@libs/lib-core';

@Component({
  selector: 'app-mail-template-step',
  template: `
    <button (click)="store.setStep(step())" class="cursor-pointer text-left">
      <span>Step {{ step() }}:</span>
      <span class="text-base" [class.fg-primary]="active()">{{ title() }}</span>
      <br />
      <span>{{ subTitle() }}</span>
    </button>
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
      'text-xs text-gray-500 dark:text-slate-500 dark:hover:bg-gray-900 hover:bg-gray-200 px-4 p-2 rounded-md',
    '[class.bg-gray-200]': 'active()',
    '[class.dark:bg-slate-800/50]': 'active()',
    '[class.fg-secondary]': 'active()',
  },
})
export class StepComponent {
  readonly store = inject(Store);

  title = input<string | undefined>('');
  subTitle = input<string | undefined>('');
  step = input.required<STEP>();
  active = input<boolean>();
}
