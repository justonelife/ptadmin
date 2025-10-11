import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  InjectionToken,
  input,
  Renderer2,
} from '@angular/core';
import { cn } from '../utils/cn';

function stringArrayAttribute(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value;
  }
  return [];
}

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

  sourcesFromInput = input([], {
    alias: 'libClassMerger',
    transform: stringArrayAttribute,
  });

  ngAfterViewInit() {
    // FIXME: [libSeverity]="willChange" then classMerger not recompute class because it run only 1 time AfterViewInit
    // and also it can not be notified about other directive's changes

    const _sources = this.sourcesFromInput()?.length
      ? this.sourcesFromInput()
      : this.sources;

    const result = cn(
      ..._sources.map((v) => this.elementRef.nativeElement.getAttribute(v))
    );
    this.renderer.setAttribute(this.elementRef.nativeElement, 'class', result);
  }
}
