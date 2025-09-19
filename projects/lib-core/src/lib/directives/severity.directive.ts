import { Directive, input } from '@angular/core';
import { AppSeverity } from '../types';
import {
  LIB_CLASS_MERGER_SOURCES,
  LibClassMergerDirective,
} from './class-merger.directive';

@Directive({
  selector: '[libSeverity]',
  host: {
    '[attr.severityClass]': 'klass',
  },
  hostDirectives: [
    {
      directive: LibClassMergerDirective,
    },
  ],
  providers: [
    {
      provide: LIB_CLASS_MERGER_SOURCES,
      useValue: ['severityClass', 'class'],
    },
  ],
})
export class LibSeverityDirective {
  readonly CLASS_MAPPER: Record<AppSeverity, string> = {
    neutral:
      'bg-gray-100 border-gray-100 text-gray-900! hover:bg-gray-200 focus-visible:ring-gray-500/50 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700',
    info: 'bg-cyan-600 border-cyan-600 text-cyan-600 hover:bg-cyan-700 focus-visible:ring-cyan-500/50',
    danger:
      'bg-red-600 border-red-600 text-red-600 hover:bg-red-700 focus-visible:ring-red-500/50',
    primary: 'bg-gradient',
    secondary:
      'bg-gray-600 border-gray-600 text-gray-600 hover:bg-gray-700 focus-visible:ring-gray-500/50',
    warning:
      'bg-amber-500 border-amber-500 text-amber-500 hover:bg-amber-600 focus-visible:ring-amber-500/50',
    success:
      'bg-green-600 border-green-600 text-green-600 hover:bg-green-700 focus-visible:ring-green-500/50',
  };

  severity = input<AppSeverity>('primary');

  get klass() {
    const severity = this.severity();
    if (severity) {
      return this.CLASS_MAPPER[severity];
    }
    return '';
  }
}
