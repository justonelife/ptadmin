import {
  AsyncPipe,
  NgComponentOutlet,
  NgTemplateOutlet,
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
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
import { LibErrorMessageComponent } from '../error-message/error-message.component';

@Component({
  imports: [
    NgComponentOutlet,
    AsyncPipe,
    NgTemplateOutlet,
    ReactiveFormsModule,
    LibControllerWrapperComponent,
    DynamicControlPipe,
    MergeObjectsPipe,
    LibErrorMessageComponent,
  ],
  selector: 'lib-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibDynamicFormComponent extends LibBaseDynamic {
  service = inject(LibComponentControlResolveService);
  override fields = input.required<RecordDynamicField>();

  readonly DYNAMIC_TYPE = DYNAMIC_TYPE;
}
