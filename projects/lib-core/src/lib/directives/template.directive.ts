import { Directive, inject, input, TemplateRef } from '@angular/core';

@Directive({ selector: '[libTemplate]' })
export class LibTemplateDirective {
  readonly templateRef = inject(TemplateRef);

  key = input.required<string>({ alias: 'libTemplate' });
}
