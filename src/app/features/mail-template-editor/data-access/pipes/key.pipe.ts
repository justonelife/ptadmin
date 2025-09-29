import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'key',
})
export class KeyPipe implements PipeTransform {
  transform(value: Record<string, unknown>): string[] {
    return Object.keys(value);
  }
}
