import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MailTemplateEditorService {
  private generate$ = new Subject<void>();
  generateObs = this.generate$.asObservable();

  generate(): void {
    this.generate$.next();
  }
}
