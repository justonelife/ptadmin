import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CardComponent } from '@libs/lib-card';
import { LibIconPositionDirective } from '@libs/lib-core';
import { LibChipComponent } from '@libs/lib-chip';

@Component({
  imports: [CardComponent, LibIconPositionDirective, LibChipComponent],
  selector: 'app-version-card-view',
  templateUrl: './version-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VersionCardViewComponent {
  label = input.required<string>();
  icon = input.required<string>();
  iconClass = input<string>();
  version = input.required<string>();
}
