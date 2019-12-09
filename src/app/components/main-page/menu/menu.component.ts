import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryEnum } from 'src/app/enums/categories-enum';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Output() menuClickEvent: EventEmitter<CategoryEnum> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  enterItem(item: string): void {
    if (!item) {
      console.log('Error on click Menu Item');
      return;
    } else {
      switch(item) {
        case CategoryEnum.ShoesAndBags:
          this.menuClickEvent.emit(CategoryEnum.ShoesAndBags);
          break;
        case CategoryEnum.PantsAndBottoms:
          this.menuClickEvent.emit(CategoryEnum.PantsAndBottoms);
          break;
        case CategoryEnum.ShirtsAndTops:
          this.menuClickEvent.emit(CategoryEnum.ShirtsAndTops);    
          break;
        case CategoryEnum.CoatsAndJackets:
          this.menuClickEvent.emit(CategoryEnum.CoatsAndJackets);  
        break;
        case CategoryEnum.Accessories:
          this.menuClickEvent.emit(CategoryEnum.Accessories);    
        break;
        case CategoryEnum.Dresses:
            this.menuClickEvent.emit(CategoryEnum.Dresses);    
          break;
      }
    }
  }
}
