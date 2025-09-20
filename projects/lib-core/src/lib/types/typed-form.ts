import { FormArray, FormControl, FormGroup } from '@angular/forms';

export type LibTypedForm<TFormData extends object> = FormGroup<{
  [TFormKey in keyof TFormData]: TFormData[TFormKey] extends Date
    ? FormControl<Date>
    : TFormData[TFormKey] extends (infer TItem)[]
      ? TItem extends Date
        ? FormControl<Date[]>
        : TItem extends object
          ? FormArray<LibTypedForm<TItem>>
          : FormControl<TItem[]>
      : TFormData[TFormKey] extends object
        ? LibTypedForm<TFormData[TFormKey]>
        : FormControl<TFormData[TFormKey]>;
}>;
