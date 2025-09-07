import { FormArray, FormControl, FormGroup } from '@angular/forms';

export type AppTypedForm<TFormData extends object> = FormGroup<{
  [TFormKey in keyof TFormData]: TFormData[TFormKey] extends Date
    ? FormControl<Date>
    : TFormData[TFormKey] extends (infer TItem)[]
      ? TItem extends Date
        ? FormControl<Date[]>
        : TItem extends object
          ? FormArray<AppTypedForm<TItem>>
          : FormControl<TItem[]>
      : TFormData[TFormKey] extends object
        ? AppTypedForm<TFormData[TFormKey]>
        : FormControl<TFormData[TFormKey]>;
}>;
