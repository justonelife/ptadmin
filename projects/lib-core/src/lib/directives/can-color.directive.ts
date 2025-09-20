import { Directive } from '@angular/core';
import { LibSeverityDirective } from './severity.directive';
import {
  LIB_CLASS_MERGER_SOURCES,
  LibClassMergerDirective,
} from './class-merger.directive';
import { LibAppearanceDirective } from './appearance.directive';

@Directive({
  selector: '[libCanColor]',
  hostDirectives: [
    {
      directive: LibSeverityDirective,
      inputs: ['libSeverity:severity'],
    },
    {
      directive: LibAppearanceDirective,
      inputs: ['libAppearance:appearance'],
    },
    LibClassMergerDirective,
  ],
  providers: [
    {
      provide: LIB_CLASS_MERGER_SOURCES,
      useValue: ['severity-class', 'appearance-class', 'class'],
    },
  ],
})
export class LibCanColorDirective {}
