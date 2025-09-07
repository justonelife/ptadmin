import { Directive, input } from '@angular/core';
import { AppSeverity } from '../types';

@Directive({
  selector: '[libSeverity]',
  standalone: true,
  host: {
    '[class]': 'klass',
  },
})
export class SeverityDirective {
  readonly CLASS_MAPPER: Record<AppSeverity, string> = {
    neutral: 'border text-foreground',
    info: 'border-transparent bg-slate-200 dark:text-zinc-600 hover:bg-slate-100',
    danger: 'text-red-500! bg-red-200',
    primary: 'bg-gradient text-white',
    secondary: 'bg-secondary',
    warning: 'bg-orange-50! text-orange-700 border-orange-200!',
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
