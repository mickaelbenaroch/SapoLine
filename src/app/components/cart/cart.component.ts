import { Component, OnInit } from '@angular/core';
import { CategoryEnum } from 'src/app/enums/categories-enum';
import { Router } from '@angular/router';
import { ItemServiceService } from 'src/app/services/item-service/item-service.service';
import { TranslateServiceService } from 'src/app/services/translate/translate-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { LanguageEnum } from 'src/app/enums/language-enum';
import { PaymentMethodsComponent } from '../modal/payment-methods/payment-methods.component';
import { LoginPageComponent } from '../modal/login-page/login-page.component';
import { AuthServiceService } from 'src/app/services/authentication/auth-service.service';
import { AuthStatusEnum } from 'src/app/enums/auth-status-enum';
import { BuyModalComponent } from '../modal/buy-modal/buy-modal/buy-modal.component';

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
              public modalService: MatDialog,
              public authService: AuthServiceService) { }

  ngOnInit() {
    if(this.itemService && this.itemService.cartOrderCounter) {
      this.itemService.cartOrderCounter.forEach(item => {
        let temp = [];
        let fixed = '';
        if (item.price.includes(',')) {
          temp = item.price.split(',');
          if (temp.length >= 2) {
            if (temp[1].includes('₪')) {
               temp[1] = temp[1].substring(0, temp[1].length - 1);
            } else {
              temp[1] = temp[1].substring(0, temp[1].length - 3);
            }
            fixed = temp[0] + '.' + temp[1];
          }
        }
        this.total += (Number(fixed) * Number(item.quantity))
      });
    }
  }

  openConfirmation(): void {
    let signUpMode: boolean = false;
    let authStatus: AuthStatusEnum = this.authService.getAuthStatus();
    switch (authStatus) {
      case AuthStatusEnum.Authorized:
      this.router.navigateByUrl('/cart');
      this.authService.openBuyPopup();
      break;
      case AuthStatusEnum.Unauthorized:
      signUpMode = true;
      const dialogRef = this.modalService.open(LoginPageComponent, {
        width: '320px',
        height: '440px',
        data: { signUpMode: signUpMode }
      });
      break;
      case AuthStatusEnum.NeedRefresh:
      signUpMode = false;
      const dialogRef2 = this.modalService.open(LoginPageComponent, {
        width: '320px',
        height: '440px',
        data: { signUpMode: signUpMode }
      });
      break;
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

  toPayment(): void {
      this.openConfirmation();
  }
}
