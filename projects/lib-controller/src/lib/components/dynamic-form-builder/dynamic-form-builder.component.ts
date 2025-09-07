import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LibBaseDynamicBuilder } from '../../directives/base-dynamic-builder.directive';
import { ValidationsResolverService } from '../../services/validations-resolver.service';
import { DynamicFormBuilderField, DynamicType } from '../../types';
import { LibDynamicFormComponent } from '../dynamic-form/dynamic-form.component';

@Component({
  imports: [CommonModule, ReactiveFormsModule, LibDynamicFormComponent],
  selector: 'lib-dynamic-form-builder',
  templateUrl: './dynamic-form-builder.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibDynamicFormBuilderComponent<
  T extends string = DynamicType | string,
> extends LibBaseDynamicBuilder {
  readonly validationsResolver = inject(ValidationsResolverService);
  override fields = input.required<DynamicFormBuilderField<T>[]>();

  buildForm(fields: DynamicFormBuilderField<T>[]): FormGroup {
    //TODO: form builder  strong typed
    return new FormGroup(
      fields.reduce((acc, cur) => {
        return {
          ...acc,
          [cur.key]: new FormControl(cur.defaultValue || null, {
            validators: cur.validations?.map((validation) =>
              this.validationsResolver.resolve(validation)
            ),
          }),
        };
      }, {})
    );
  }
}
