import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LibButtonComponent } from '@libs/lib-button';
import { LibSidenavLayoutComponent } from '@libs/lib-layouts';
import { APP_MENU, AppStore } from '@shared/data-access';
import { IsLightThemePipe } from '@shared/data-access/pipes';
import { AppLogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-layout',
  imports: [
    LibSidenavLayoutComponent,
    RouterOutlet,
    LibButtonComponent,
    IsLightThemePipe,
    AppLogoComponent,
    RouterLink,
  ],
  templateUrl: './layout.component.html',
})
export class AppLayoutComponent {
  readonly MENU = inject(APP_MENU, { skipSelf: true });
  readonly appStore = inject(AppStore);
  theme = this.appStore.theme;
  isSidebarCollapsed = this.appStore.isSidebarCollapsed;

  toggleTheme(): void {
    this.appStore.setTheme(this.theme() === 'light' ? 'dark' : 'light');
  }
}
