import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-mail-template-live-preview',
  templateUrl: './live-preview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LivePreviewComponent {}
