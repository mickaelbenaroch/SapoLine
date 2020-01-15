import { Component, OnInit } from '@angular/core';
import { CategoryEnum } from 'src/app/enums/categories-enum';
import { Router } from '@angular/router';
import { ItemServiceService } from 'src/app/services/item-service/item-service.service';
import { TranslateServiceService } from 'src/app/services/translate/translate-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { LanguageEnum } from 'src/app/enums/language-enum';
import { PaymentMethodsComponent } from '../modal/payment-methods/payment-methods.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public total: number = 0;
  public languageEnum = LanguageEnum;
  constructor(public router: Router,
              public itemService: ItemServiceService,
              public langService: TranslateServiceService,
              public _DomSanitizationService: DomSanitizer,
              public modalService: MatDialog) { }

  ngOnInit() {
    if(this.itemService && this.itemService.cartOrderCounter) {
      this.itemService.cartOrderCounter.forEach(item => {
        let temp = [];
        let fixed = '';
        if (item.price.includes(',')) {
          temp = item.price.split(',');
          if (temp.length === 2) {
            fixed = temp[0] + '.' + temp[1];
          }
        }
        this.total += Number(fixed) * Number(item.quantity)
      });
    }
  }

  openConfirmation(): void {
      const dialogRef = this.modalService.open(PaymentMethodsComponent, {
        width: '550px',
        height: '526px',
        data: { total: this.total }
      });
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

  toPayment(): void {
      this.openConfirmation();
  }
}
