import { TemplateRef, Type } from '@angular/core';
import { IconCombinePosition, LibSafeAny } from '@libs/lib-core';

export const DYNAMIC_TYPE = {
  INPUT: 'INPUT',
  TEXTAREA: 'TEXTAREA',
  SELECT: 'SELECT',
  MULTIPLE: 'MULTIPLE',
  CHIPS_INPUT: 'CHIPS_INPUT',
  NUMBER_INPUT: 'NUMBER_INPUT',
  PASSWORD_INPUT: 'PASSWORD_INPUT',
  CUSTOM: 'CUSTOM',
} as const;

export type DynamicType = (typeof DYNAMIC_TYPE)[keyof typeof DYNAMIC_TYPE];

export type BranchTrueFalseOnKey<K extends string, T, F = object> =
  | (Record<K, true> & T)
  | (Record<K, false> & F);

type FieldKey = string;
export type FieldData<ExtendedType extends string = DynamicType | string> = {
  label?: string;
  styleClass?: string;
  order?: number;
} & BranchTrueFalseOnKey<
  'withWrapper',
  { icon: string; iconSet?: string; iconPosition?: IconCombinePosition }
> &
  (
    | { type: typeof DYNAMIC_TYPE.CUSTOM; templateRef?: TemplateRef<unknown> }
    | ({ type: Exclude<ExtendedType, typeof DYNAMIC_TYPE.CUSTOM> } & {
        inputs?: Record<string, LibSafeAny>;
        componentData?: {
          component?: Promise<Type<unknown>>;
          inputs: Record<string, LibSafeAny>;
        };
      })
  );

export type RecordDynamicField<
  ExtendedType extends string = DynamicType | string,
> = Record<FieldKey, FieldData<ExtendedType>>;
