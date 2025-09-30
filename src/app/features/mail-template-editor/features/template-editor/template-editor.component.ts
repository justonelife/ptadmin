import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LibButtonComponent } from '@libs/lib-button';
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
    LibButtonComponent,
  ],
  host: {
    class: 'mt-6 block pb-6 px-1 space-y-6',
  },
})
export class TemplateEditorComponent {
  template = input<string>('');
  variables = input<string[]>([]);

  templateChange = output<string>();

  valueChange(value: string) {
    this.templateChange.emit(value);
  }
}
