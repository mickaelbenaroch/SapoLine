import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryEnum } from 'src/app/enums/categories-enum';
import { TranslateServiceService } from 'src/app/services/translate/translate-service.service';
import { LanguageEnum } from 'src/app/enums/language-enum';
import { ItemServiceService } from 'src/app/services/item-service/item-service.service';
import { Router } from '@angular/router';
import { OrderServiceService } from 'src/app/services/order/order-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public localLanguageEnum = LanguageEnum;
  public hamburger: boolean;
  @Output() menuClickEvent: EventEmitter<CategoryEnum> = new EventEmitter();
  constructor(public langService: TranslateServiceService,
              public itemService: ItemServiceService,
              public router: Router,
              public orderService: OrderServiceService) { }

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

  toggleMenu(): void {
    this.hamburger = !this.hamburger;
  }

  changeLanguageTo(language: string) : void {
    switch(language) {
      case 'hebrew':
        this.langService.currentLanguage = LanguageEnum.English;
        break;
      case 'usa':
        this.langService.currentLanguage = LanguageEnum.Hebrew;
        break;
    }
  }

  openCart(): void {
    this.router.navigateByUrl('cart');
  }
}
