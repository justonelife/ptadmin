import { Directive, inject, input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[libDynamicControllerTemplate]',
})
export class LibDynamicControllerTemplate {
  readonly templateRef = inject(TemplateRef);

  key = input.required<string>({ alias: 'libDynamicControllerTemplate' });
}
