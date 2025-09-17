import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'lib-label',
  template: `
    @if (label(); as _label) {
      <span class="lib-controller__label text-md fg-primary block">
        {{ _label }}
      </span>
    }
  `,
})
export class LibLabelComponent {
  label = input.required<string>();
}
