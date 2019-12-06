import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsDisplayerComponent } from './items-displayer.component';

describe('ItemsDisplayerComponent', () => {
  let component: ItemsDisplayerComponent;
  let fixture: ComponentFixture<ItemsDisplayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsDisplayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
