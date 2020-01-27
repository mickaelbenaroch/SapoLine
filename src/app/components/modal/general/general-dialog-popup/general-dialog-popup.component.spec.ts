import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralDialogPopupComponent } from './general-dialog-popup.component';

describe('GeneralDialogPopupComponent', () => {
  let component: GeneralDialogPopupComponent;
  let fixture: ComponentFixture<GeneralDialogPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralDialogPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralDialogPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
