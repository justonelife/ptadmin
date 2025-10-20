import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'htmlMinify',
})
export class HtmlMinifyPipe implements PipeTransform {
  transform(value: string) {
    if (!value) return '';
    return value
      .replace(/>\s+</g, '><') // Remove whitespace between tags
      .replace(/\s\s+/g, ' ') // Collapse consecutive whitespace
      .trim(); // Trim leading/trailing space
  }
}
