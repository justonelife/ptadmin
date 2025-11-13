import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
  output,
} from '@angular/core';

@Directive({ selector: '[appOutsideClick]' })
export class OutsideClickDirective {
  elementRef = inject(ElementRef);

  disableOutsideClick = input<boolean>();

  emitOutsideClick = output<void>();

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (
      this.disableOutsideClick() ||
      this.elementRef.nativeElement.contains(event.target)
    ) {
      return;
    }

    this.emitOutsideClick.emit();
  }
}
