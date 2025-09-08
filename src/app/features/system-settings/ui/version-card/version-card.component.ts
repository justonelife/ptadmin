import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CardComponent } from '@libs/lib-card';

@Component({
  imports: [CardComponent],
  selector: 'app-version-card-view',
  templateUrl: './version-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VersionCardViewComponent {

}
