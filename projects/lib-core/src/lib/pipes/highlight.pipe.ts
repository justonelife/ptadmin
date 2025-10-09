import { inject, Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'libHighlight',
})
export class LibHighLightPipe implements PipeTransform {
  sanitizer = inject(DomSanitizer);
  transform(value: string, matchText: string, styleClass = 'bg-blue-500') {
    const matching = value.match(matchText);
    if (!matching) return value;
    const startMatchIndex = matching.index || 0;
    const matchingLength = matching[0].length;
    return this.sanitizer.sanitize(
      SecurityContext.HTML,
      `${value.slice(0, startMatchIndex)}<span class="${styleClass}">${value.slice(startMatchIndex, startMatchIndex + matchingLength)}</span>${value.slice(startMatchIndex + matchingLength, value.length)}`
    );
  }
}
