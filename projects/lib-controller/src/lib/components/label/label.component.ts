import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'lib-label',
  template: `
    @if (label(); as _label) {
      <span class="lib-controller__label text-sm fg-primary block">
        {{ _label }}
      </span>
    }
  `,
  host: {
    class: 'block',
    '[class.mb-2]': 'label()',
  },
})
export class LibLabelComponent {
  label = input.required<string>();
}
