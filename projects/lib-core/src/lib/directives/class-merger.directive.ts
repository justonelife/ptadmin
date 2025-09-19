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

  //TODO: remove debugger and cleanup
  ngAfterViewInit() {
    // console.log(this.sources);
    // console.log(this.host)
    console.log('element:', this.elementRef.nativeElement);
    // console.log('class:', this.elementRef.nativeElement.getAttribute('class'));
    // console.log(
    //   'severityClass:',
    //   this.elementRef.nativeElement.getAttribute('severityClass')
    // );
    // console.log(
    //   'buttonClass:',
    //   this.elementRef.nativeElement.getAttribute('buttonClass')
    // );
    const result = cn(
      ...this.sources.map((v) => this.elementRef.nativeElement.getAttribute(v))
    );
    console.log(result);
    this.renderer.setAttribute(this.elementRef.nativeElement, 'class', result);
  }
}
