import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { APP_MENU, APP_THEME_KEY, MENU } from '@shared/data-access/constants';
import { AppStore } from '@shared/data-access/stores';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    AppStore,
    {
      provide: APP_MENU,
      useValue: MENU,
    },
    {
      provide: APP_THEME_KEY,
      useValue: 'ptadmin:theme',
    },
  ],
})
export class AppComponent {
  readonly appStore = inject(AppStore);
}
