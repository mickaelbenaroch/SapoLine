import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JacketsComponent } from './jackets.component';

describe('JacketsComponent', () => {
  let component: JacketsComponent;
  let fixture: ComponentFixture<JacketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JacketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JacketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
