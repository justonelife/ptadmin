import {
  computed,
  contentChildren,
  Directive,
  effect,
  inject,
  OnInit,
  Signal,
  TemplateRef,
} from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { LibComponentControlResolveService } from '../services/component-control-resolve.service';
import { RecordDynamicField, DYNAMIC_TYPE, FieldData } from '../types';
import { LibDynamicControllerTemplate } from './dynamic-controller-template.directive';

@Directive()
export abstract class LibBaseDynamic<
  T extends RecordDynamicField = RecordDynamicField,
> implements OnInit
{
  abstract service: LibComponentControlResolveService;
  abstract fields: Signal<T>;

  formGroup = inject(FormGroupDirective);
  form: FormGroup | undefined;

  items = computed<(FieldData & { key: string })[]>(() => {
    return Object.entries(this.fields())
      .map(([key, f]) => {
        if (this.isCustomField(f)) {
          const extras = (() => {
            const templateRef = this.templatesMapper[key];
            if (!templateRef) console.error(`Missing template for "${key}"`);
            return { templateRef };
          })();
          return { ...f, ...extras, key };
        } else {
          const resolve = this.service.resolve(f.type);
          return {
            ...f,
            componentData: {
              component: resolve?.component,
              inputs: {
                ...resolve?.inputs,
                label: f.label,
                autoFocus: f.autoFocus,
              },
            },
            key,
          };
        }
      })
      .sort((a, b) => {
        if (a.order === undefined || a.order === null) return 1;
        if (b.order === undefined || b.order === null) return -1;
        return a.order - b.order;
      });
  });

  templates = contentChildren(LibDynamicControllerTemplate);
  templatesMapper: Record<string, TemplateRef<unknown>> = {};

  constructor() {
    effect(() => {
      this.computeTemplatesMapper();
    });
  }

  ngOnInit() {
    this.form = this.formGroup.form;
  }

  private isCustomField(
    f: FieldData
  ): f is FieldData & { type: typeof DYNAMIC_TYPE.CUSTOM } {
    return f.type === DYNAMIC_TYPE.CUSTOM;
  }

  private computeTemplatesMapper(): void {
    const updateTemplatesMapper: Record<string, TemplateRef<unknown>> = {};
    this.templates()?.forEach((template) => {
      updateTemplatesMapper[template.key()] = template.templateRef;
    });
    this.templatesMapper = { ...updateTemplatesMapper };
  }
}
