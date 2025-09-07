import { computed, Directive, effect, Signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  DynamicFormBuilderField,
  DynamicType,
  FieldData,
  RecordDynamicField,
} from '../types';

@Directive()
export abstract class LibBaseDynamicBuilder<
  T extends string = DynamicType | string,
> {
  abstract fields: Signal<DynamicFormBuilderField<T>[]>;
  form: FormGroup = new FormGroup({});

  formFields = computed<RecordDynamicField<T>>(() => {
    return this.fields().reduce((acc, cur) => {
      return {
        ...acc,
        [cur.key]: {
          label: cur.label,
          type: cur.type,
          inputs: cur.inputs,
          styleClass: cur.styleClass,
        } as FieldData<T>,
      };
    }, {} as RecordDynamicField<T>);
  });

  constructor() {
    effect(() => {
      const fields = this.fields();
      this.form = this.buildForm(fields);
    });
  }

  abstract buildForm(fields: DynamicFormBuilderField<T>[]): FormGroup;
}
