import {
  AsyncPipe,
  NgComponentOutlet,
  NgTemplateOutlet,
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  inject,
  input,
  TemplateRef,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  DYNAMIC_TYPE,
  LibControllerWrapperComponent,
  RecordDynamicField,
} from '@libs/lib-controller';
import { LibBaseDynamic } from '../../directives/base-dynamic.directive';
import { DynamicControlPipe } from '../../pipes/dynamic-control.pipe';
import { MergeObjectsPipe } from '../../pipes/merge-objects.pipe';
import { LibComponentControlResolveService } from '../../services/component-control-resolve.service';

@Component({
  imports: [
    NgComponentOutlet,
    AsyncPipe,
    NgTemplateOutlet,
    ReactiveFormsModule,
    LibControllerWrapperComponent,
    DynamicControlPipe,
    MergeObjectsPipe,
  ],
  selector: 'lib-dynamic-filter',
  templateUrl: './dynamic-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LibComponentControlResolveService],
})
export class LibDynamicFilterComponent extends LibBaseDynamic {
  service = inject(LibComponentControlResolveService);
  override fields = input.required<RecordDynamicField>();

  readonly DYNAMIC_TYPE = DYNAMIC_TYPE;

  actionTemplate = contentChild<TemplateRef<unknown>>('action');
}
