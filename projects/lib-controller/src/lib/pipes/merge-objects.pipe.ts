import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mergeObjects',
})
export class MergeObjectsPipe<T extends Record<string, unknown>>
  implements PipeTransform
{
  transform(value: T | null, ...args: T[]) {
    return [value, ...args].reduce((acc, cur) => Object.assign(acc, cur), {});
  }
}
