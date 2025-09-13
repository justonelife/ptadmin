import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LibIconPositionDirective, IconCombinePosition } from '@libs/lib-core';

@Component({
  selector: 'lib-controller-wrapper',
  template: `
    @if (label(); as _label) {
      <span class="text-md fg-primary block">
        {{ _label }}
      </span>
    }
    <div
      class="
      inline-flex
      items-center
      w-full
      h-[40px]
      py-0
      px-2
      bg-transparent
      border
      border-gray-300
      dark:border-stone-800
      rounded-md
      focus:outline-none
      focus:border-transparent
      focus:ring-1
      focus:ring-black-500
      "
      [libIconPosition]="iconPosition()"
      [icon]="icon() || ''"
      [iconSet]="iconSet() || ''"
    >
      <ng-content />
    </div>
  `,
  imports: [LibIconPositionDirective],
  styleUrl: './controller-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col',
  },
})
export class LibControllerWrapperComponent {
  label = input<string>('');
  icon = input<string>();
  iconPosition = input<IconCombinePosition>('center left');
  iconSet = input<string>('');
}
