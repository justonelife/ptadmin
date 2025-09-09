import { ChangeDetectionStrategy, Component, input, OnInit } from '@angular/core';
import { CardComponent } from '@libs/lib-card';
import { LibIconPositionDirective } from '@libs/lib-core';

@Component({
  imports: [
    CardComponent,
    LibIconPositionDirective,
  ],
  selector: 'app-version-card-view',
  templateUrl: './version-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VersionCardViewComponent {
  label = input.required<string>();
  icon = input.required<string>();

}
