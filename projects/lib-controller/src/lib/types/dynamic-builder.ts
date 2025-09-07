import { LibOption, LibSafeAny } from '@libs/lib-core';
import { DynamicType } from './dynamic';

export type DynamicFormBuilderFieldType<
  ExtendedType extends string = DynamicType,
> = `${ExtendedType}`;

export type DynamicFormBuilderFieldValidationType =
  | 'required'
  | 'min'
  | 'max'
  | string;

export interface DynamicFormBuilderFieldValidation {
  type: DynamicFormBuilderFieldValidationType;
  data?: LibSafeAny;
}

export interface DynamicFormBuilderField<
  ExtendedType extends string = DynamicType,
> {
  key: string;
  label: string;
  type: DynamicFormBuilderFieldType<ExtendedType>;
  order?: number;
  inputs?: Record<string, unknown> & {
    options?: LibOption[];
  };
  //TODO: consider where to place `block`
  //block
  hidden?: boolean;
  styleClass?: string;
  validations?: DynamicFormBuilderFieldValidation[];
  defaultValue?: unknown;
}
