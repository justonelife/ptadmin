import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { LibBaseController, LibSelectComponent } from '@libs/lib-controller';
import { LibOption, provideControlValueAccessor } from '@libs/lib-core';

@Component({
  standalone: true,
  imports: [LibSelectComponent],
  selector: 'app-gender-select',
  templateUrl: './gender-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideControlValueAccessor(GenderSelectComponent)],
})
export class GenderSelectComponent extends LibBaseController<number> {
  override placeholder = input<string>('');
  override label = input<string>('Gender');
  override autoFocus = input(false, { transform: booleanAttribute });

  readonly OPTIONS: LibOption<number>[] = [
    {
      label: 'Male',
      value: 0,
    },
    {
      label: 'Female',
      value: 1,
    },
  ];
}
