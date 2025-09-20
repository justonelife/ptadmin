import {
  ChangeDetectionStrategy,
  Component,
  input,
  Signal,
} from '@angular/core';
import {
  LIB_CLASS_MERGER_SOURCES,
  LibAppearanceDirective,
  LibClassMergerDirective,
  LibIconPositionDirective,
  LibSeverityDirective,
} from '@libs/lib-core';

export interface IAlertComponent {
  title?: string | Signal<string>;
  message?: string | Signal<string>;
}

@Component({
  selector: 'lib-alert',
  templateUrl: './alert.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    {
      directive: LibIconPositionDirective,
      inputs: ['libIconPosition', 'icon', 'iconSet'],
    },
  ],
  providers: [
    {
      provide: LIB_CLASS_MERGER_SOURCES,
      useValue: ['severity-class', 'appearance-class', 'class'],
    },
  ],
  host: {
    class: 'p-2 min-w-[300px] max-w-[400px]',
  },
})
export class AlertComponent implements IAlertComponent {
  title = input<string>('');
  message = input<string>('');
}
