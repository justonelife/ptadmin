import {
  inject,
  InjectionToken,
  Injector,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { FormControl } from '@angular/forms';

export const DYNAMIC_CONTROL = new InjectionToken<FormControl>(
  'DYNAMIC_CONTROL'
);

@Pipe({
  name: 'dynamicControl',
})
export class DynamicControlPipe implements PipeTransform {
  readonly injector = inject(Injector);

  transform(control: FormControl) {
    if (!control) return;
    return Injector.create({
      providers: [
        {
          provide: DYNAMIC_CONTROL,
          useValue: control,
        },
      ],
      parent: this.injector,
    });
  }
}
