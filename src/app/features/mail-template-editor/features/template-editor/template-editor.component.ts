import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LibCardComponent } from '@libs/lib-card';
import { LibTextInputComponent } from '@libs/lib-controller';
import { LibIconPositionDirective } from '@libs/lib-core';

@Component({
  selector: 'app-mail-template-editor',
  templateUrl: './template-editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LibCardComponent,
    LibIconPositionDirective,
    LibTextInputComponent,
    FormsModule,
  ],
  host: {
    class: 'mt-6 block pb-6 px-1 space-y-6',
  },
})
export class TemplateEditorComponent {
  template = input();
}
