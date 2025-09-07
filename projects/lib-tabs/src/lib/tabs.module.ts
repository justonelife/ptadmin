import { NgModule } from '@angular/core';
import { LibTabsComponent } from './tabs.component';
import { LibTemplateDirective } from '@libs/lib-core';

@NgModule({
  imports: [LibTabsComponent, LibTemplateDirective],
  exports: [LibTabsComponent, LibTemplateDirective],
})
export class LibTabsModule {}
