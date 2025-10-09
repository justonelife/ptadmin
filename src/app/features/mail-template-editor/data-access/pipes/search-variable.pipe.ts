import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchVariable',
})
export class SearchVariablePipe<
  T extends { key: string; value: Record<string, string> } = {
    key: string;
    value: Record<string, string>;
  },
> implements PipeTransform
{
  transform(arr: T[], search: string): T[] {
    return arr.filter((item) => item.key.includes(search));
  }
}
