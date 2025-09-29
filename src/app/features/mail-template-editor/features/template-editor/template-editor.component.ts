import {
  ChangeDetectionStrategy,
  Component,
  Input,
  input,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LibButtonComponent } from '@libs/lib-button';
import { LibCardComponent } from '@libs/lib-card';
import { LibChipComponent } from '@libs/lib-chip';
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
    LibChipComponent,
    LibButtonComponent,
  ],
  host: {
    class: 'mt-6 block pb-6 px-1 space-y-6',
  },
})
export class TemplateEditorComponent {
  @Input() template = '';
  variables = input<string[]>([]);
}
