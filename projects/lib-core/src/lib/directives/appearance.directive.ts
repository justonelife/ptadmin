import { computed, Directive, input } from '@angular/core';
import { LibAppearance } from '../types';
import { LIB_CLASS_MERGER_SOURCES } from './class-merger.directive';

@Directive({
  selector: '[libAppearance]',
  host: {
    '[attr.appearance-class]': 'klass()',
  },
  providers: [
    {
      provide: LIB_CLASS_MERGER_SOURCES,
      useValue: ['appearance-class', 'class'],
    },
  ],
})
export class LibAppearanceDirective {
  readonly CLASS_MAPPER: Record<LibAppearance, string> = {
    filled: 'rounded-md text-white',
    outlined: 'rounded-md bg-transparent hover:bg-current/10 border',
    raised: 'rounded-md shadow-lg text-white shadow-black/40',
    soft: 'rounded-md bg-current/20 hover:bg-current/30 border',
    ghost: 'rounded-md bg-transparent hover:bg-current/10',
  };

  appearance = input<LibAppearance>('filled', { alias: 'libAppearance' });
  klass = computed<string>(() => {
    const appearance = this.appearance();
    if (appearance) {
      return this.CLASS_MAPPER[appearance];
    }
    return '';
  });
}
