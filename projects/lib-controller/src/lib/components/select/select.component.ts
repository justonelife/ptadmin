import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { LibBaseController } from '../../directives/base-controller.directive';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { LibSafeAny, provideControlValueAccessor } from '@libs/lib-core';
import { LibLabelComponent } from '@libs/lib-controller';

export interface Option<T = LibSafeAny> {
  label: string;
  value: T;
}

@Component({
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    LibLabelComponent,
  ],
  selector: 'lib-select',
  templateUrl: './select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideControlValueAccessor(LibSelectComponent)],
})
export class LibSelectComponent extends LibBaseController<unknown> {
  override placeholder = input<string>('');
  override label = input<string>('');

  rawOptions = input.required<Option<unknown>[] | unknown[]>({
    alias: 'options',
  });
  options = computed(() => {
    //TODO: yep!
    return this.rawOptions() as Option<unknown>[];
    // const rawOptions = this.rawOptions();
    // if (!rawOptions.length) return [];
    // if (rawOptions[0] instanceof Option) {
    //   return rawOptions as Option[];
    // }
    // return rawOptions.map(value => ({ label: value, value })) as Option[];
  });

  multiple = input<boolean>(false);
}
