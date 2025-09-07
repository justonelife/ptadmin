import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class LibBreakpointService {
  readonly destroyRef = inject(DestroyRef);
  readonly breakpointObserver = inject(BreakpointObserver);

  observe(value: string | readonly string[]): Observable<BreakpointState> {
    return this.breakpointObserver
      .observe(value)
      .pipe(takeUntilDestroyed(this.destroyRef));
  }
}
