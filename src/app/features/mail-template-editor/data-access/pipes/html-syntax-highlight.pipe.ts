import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'htmlSyntaxHighlight',
  standalone: true,
})
export class HtmlSyntaxHighlightPipe implements PipeTransform {
  readonly sanitizer = inject(DomSanitizer);

  transform(code: string): SafeHtml {
    const highlightHTML = (html: string) => {
      return html
        .replace(
          /(&lt;\/?)([a-zA-Z][a-zA-Z0-9]*)(.*?)(&gt;)/g,
          '<span class="text-blue-400">$1</span><span class="text-purple-400">$2</span><span class="text-yellow-400">$3</span><span class="text-blue-400">$4</span>'
        )
        .replace(
          /({[^}]+})/g,
          '<span class="text-pink-400 font-semibold">$1</span>'
        )
        .replace(
          /(&lt;!--.*?--&gt;)/g,
          '<span class="text-gray-500 italic">$1</span>'
        );
    };

    const escapeHtml = (unsafe: string) => {
      const result = unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
      return result;
    };

    return this.sanitizer.bypassSecurityTrustHtml(
      highlightHTML(escapeHtml(code))
    );
  }
}
