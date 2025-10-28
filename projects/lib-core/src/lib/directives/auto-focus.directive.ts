import {
  Directive,
  ElementRef,
  inject,
  AfterViewInit,
  input,
} from '@angular/core';

@Directive({ selector: '[libAutoFocus]' })
export class LibAutoFocusDirective implements AfterViewInit {
  elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  autoFocus = input.required<boolean>({ alias: 'libAutoFocus' });

  ngAfterViewInit(): void {
    if (!this.elementRef) return;

    if (this.autoFocus()) {
      this.elementRef.nativeElement.focus();
    }
  }
}
