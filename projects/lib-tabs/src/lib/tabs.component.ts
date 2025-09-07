import {
  AsyncPipe,
  JsonPipe,
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
  imports: [
    MatTabsModule,
    JsonPipe,
    NgTemplateOutlet,
    NgComponentOutlet,
    AsyncPipe,
  ],
})
export class LibTabsComponent {
  tabs = input.required<LibTabItem[]>();

  templates = contentChildren(LibTemplateDirective);
  templatesMapper = computed<Record<string, Render>>(() => {
    const componentsMapper = Object.fromEntries(
      this.tabs().map((item) => [item.value, item.component])
    );
    console.log(componentsMapper);

    const updateTemplatesMapper: Record<string, Render> = {};
    this.templates()?.forEach((template) => {
      updateTemplatesMapper[template.key()] = {
        template: template.templateRef,
        component: componentsMapper[template.key()],
      };
    });
    return { ...updateTemplatesMapper };
  });
}
