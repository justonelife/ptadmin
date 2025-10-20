import {
  Component,
  input,
  provideZonelessChangeDetection,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibAlertComponent } from './alert.component';

@Component({
  standalone: true,
  imports: [LibAlertComponent],
  template: `
    <lib-alert [lifetime]="lifetime()" (emitClose)="close()"></lib-alert>
  `,
})
class TestHostComponent {
  lifetime = input<number | null>();
  close() {
    return null;
  }
}

describe('it should test LibAlertComponent', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  // let fixture: ComponentFixture<LibAlertComponent>;
  // let component: LibAlertComponent;
  let closeSpy: jasmine.Spy;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    hostFixture = TestBed.createComponent(TestHostComponent);
    await hostFixture.whenStable();
    hostComponent = hostFixture.componentInstance;
    closeSpy = spyOn(hostComponent, 'close');

    // fixture = TestBed.createComponent(LibAlertComponent);
    // await fixture.whenStable();
    // component = fixture.componentInstance;
  });

  xit('it should NOT emit `emitClose` if `lifetime` is `null`', () => {
    jasmine.clock().install();
    jasmine.clock().mockDate();

    jasmine.clock().tick(10_000);
    expect(closeSpy).not.toHaveBeenCalled();

    jasmine.clock().uninstall();
  });

  xit('it shoud emit `emitClose` after the specified `lifetime` duration', () => {
    jasmine.clock().install();
    jasmine.clock().mockDate();

    hostFixture.componentRef.setInput('lifetime', 5_000);
    // hostFixture.whenStable();
    // expect(hostComponent.lifetime()).toBe(5_000);
    // expect(closeSpy).not.toHaveBeenCalled();
    //
    // jasmine.clock().tick(4_999);
    // expect(closeSpy).not.toHaveBeenCalled();
    //
    jasmine.clock().tick(5_000);
    expect(closeSpy).toHaveBeenCalledTimes(1);

    jasmine.clock().uninstall();
  });
});
