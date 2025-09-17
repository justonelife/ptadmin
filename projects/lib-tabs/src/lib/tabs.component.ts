import {
  AsyncPipe,
  NgComponentOutlet,
  NgTemplateOutlet,
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  input,
  TemplateRef,
  Type,
} from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { LibTemplateDirective } from '@libs/lib-core';

export interface LibTabItem<T = string> {
  label: string;
  value: T;
  component?: Promise<Type<unknown>>;
}

interface Render {
  template?: TemplateRef<unknown>;
  component?: Promise<Type<unknown>>;
}

@Component({
  selector: 'lib-tabs',
  templateUrl: './tabs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatTabsModule, NgTemplateOutlet, NgComponentOutlet, AsyncPipe],
})
export class LibTabsComponent {
  tabs = input.required<LibTabItem[]>();
  templates = contentChildren(LibTemplateDirective);

  mapper = computed<Record<string, Render>>(() => {
    const templateMapper: Record<
      string,
      TemplateRef<unknown>
    > = Object.fromEntries(
      this.templates()?.map((t) => [t.key(), t.templateRef]) ?? []
    );

    return this.tabs().reduce(
      (acc, cur) => ({
        ...acc,
        [cur.value]: {
          template: templateMapper[cur.value],
          component: cur.component,
        },
      }),
      {}
    );
  });
}
