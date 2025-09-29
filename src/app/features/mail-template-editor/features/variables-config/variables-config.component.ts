import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LibCardComponent } from '@libs/lib-card';
import { LibIconPositionDirective } from '@libs/lib-core';

@Component({
  selector: 'app-mail-template-variables-config',
  templateUrl: './variables-config.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LibCardComponent, LibIconPositionDirective],
  host: {
    class: 'mt-6 block pb-6 px-1 space-y-6',
  },
})
export class VariablesConfigComponent {}
