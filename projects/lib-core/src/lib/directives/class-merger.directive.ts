import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  InjectionToken,
  Renderer2,
} from '@angular/core';
import { cn } from '../utils/cn';

export const LIB_CLASS_MERGER_SOURCES = new InjectionToken<string[]>(
  'LIB_CLASS_MERGER_SOURCES',
  {
    providedIn: 'root',
    factory: () => ['class'],
  }
);

@Directive({
  selector: '[libClassMerger]',
})
export class LibClassMergerDirective implements AfterViewInit {
  sources = inject(LIB_CLASS_MERGER_SOURCES);
  elementRef = inject(ElementRef);
  renderer = inject(Renderer2);

  ngAfterViewInit() {
    const result = cn(
      ...this.sources.map((v) => this.elementRef.nativeElement.getAttribute(v))
    );
    this.renderer.setAttribute(this.elementRef.nativeElement, 'class', result);
  }
}
