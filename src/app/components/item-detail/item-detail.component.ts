import { Component, OnInit } from '@angular/core';
import { ItemServiceService } from 'src/app/services/item-service/item-service.service';
import { ItemModel } from 'src/app/models/ItemModel';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CategoryEnum } from 'src/app/enums/categories-enum';
import { TranslateServiceService } from 'src/app/services/translate/translate-service.service';
import { LanguageEnum } from 'src/app/enums/language-enum';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {

  public currentItem: ItemModel;
  public languageEnum = LanguageEnum;
  public sizes: string[] = [];
  constructor(public itemService: ItemServiceService,
              public _DomSanitizationService: DomSanitizer,
              public router: Router,
              public langService: TranslateServiceService) { }

  ngOnInit() {
    if (this.itemService.currentViewedItem) {
      this.currentItem = this.itemService.currentViewedItem;
      this.currentItem.quantity = 1;
    } else {
      this.router.navigateByUrl('/');
    }
    this.splitSizes();
    if (this.currentItem) {
      this.currentItem.choosedSize = this.sizes[0];
    }
  }

  addToCart(): void {
    if (this.currentItem) {
      if (this.checkValidity()) {
         console.log("item added to cart: " +  this.currentItem);
         this.itemService.addToCart(this.currentItem);
      } else {
        //TODO: Handle errors on order
      }
      //this.itemService.openConfirmation(this.currentItem);
    }
  }

  itemMenuClicked(ev: CategoryEnum): void {
    if (ev) {
      switch(ev) {
        case CategoryEnum.ShoesAndBags:
            this.router.navigateByUrl('shoes');
            break;
          case CategoryEnum.PantsAndBottoms:
            this.router.navigateByUrl('bottoms');            
            break;
          case CategoryEnum.ShirtsAndTops:
            this.router.navigateByUrl('tops');    
            break;
          case CategoryEnum.CoatsAndJackets:
            this.router.navigateByUrl('jackets');  
          break;
          case CategoryEnum.Accessories:
            this.router.navigateByUrl('accessories');   
          break;
          case CategoryEnum.Dresses:
            this.router.navigateByUrl('dresses');
            break;
      }
    }
  }

  splitSizes() : void {
    if (this.currentItem && this.currentItem.sizes) {
      let temp = this.currentItem.sizes.split(',');
      temp.forEach(char => {
        if (char !== ',') {
          this.sizes.push(char);
        }
      })
    }
  }
  
  checkValidity(): boolean {
    if (this.currentItem && 
       this.currentItem.quantity && 
       this.currentItem.quantity > 0 && 
       this.currentItem.quantity < 10  &&
       this.currentItem.sizes.includes(this.currentItem.choosedSize)) {
         return true;
    } 
    return false; 
  }
}