import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartingDialogComponent } from './starting-dialog.component';

describe('StartingDialogComponent', () => {
  let component: StartingDialogComponent;
  let fixture: ComponentFixture<StartingDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartingDialogComponent]
    });
    fixture = TestBed.createComponent(StartingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
