import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Appearance } from './types';
import {
  AppSeverity,
  SeverityDirective,
  LibIconPositionDirective,
} from '@libs/lib-core';

@Component({
  selector: 'lib-card',
  imports: [MatCardModule, SeverityDirective, LibIconPositionDirective],
  template: `
    <mat-card libSeverity [severity]="severity()" [appearance]="appearance()">
      @if (header(); as _header) {
        <mat-card-header class="mb-8">
          <mat-card-title>
            <span
              libIconPosition="center left"
              icon="dns"
              iconSet="outlined"
              class="font-semibold text-sm fg-primary"
            >
              {{ _header }}
            </span>
          </mat-card-title>
        </mat-card-header>
      }
      <mat-card-content><ng-content></ng-content></mat-card-content>
    </mat-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  appearance = input<Appearance>('outlined');
  header = input<string>();
  severity = input<AppSeverity>('info');
}
