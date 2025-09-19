import { Pipe, PipeTransform } from '@angular/core';
import { twMerge } from 'tailwind-merge';

@Pipe({
  name: 'libTwMerge',
})
export class LibTwMerge implements PipeTransform {
  transform(target: string, ...sources: string[]): string {
    return twMerge(
      ...target,
      sources.reduce((acc, cur) => `${acc} ${cur}`, '')
    );
  }
}
