import { Component, OnInit } from '@angular/core';
import { CategoryEnum } from 'src/app/enums/categories-enum';
import { Router } from '@angular/router';
import { TranslateServiceService } from 'src/app/services/translate/translate-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { LanguageEnum } from 'src/app/enums/language-enum';
import { LoginPageComponent } from '../modal/login-page/login-page.component';
import { AuthServiceService } from 'src/app/services/authentication/auth-service.service';
import { AuthStatusEnum } from 'src/app/enums/auth-status-enum';
import { OrderServiceService } from 'src/app/services/order/order-service.service';
import { ModalModel } from 'src/app/models/ModalModel';
import { NotificationModalComponent } from '../modal/notification/notification-modal/notification-modal.component';
import { ModalTypeEnum } from 'src/app/enums/modal-type-enum';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public total: number = 0;
  public languageEnum = LanguageEnum;
  constructor(public router: Router,
              public orderService: OrderServiceService,
              public langService: TranslateServiceService,
              public _DomSanitizationService: DomSanitizer,
              public modalService: MatDialog,
              public authService: AuthServiceService) { }

  ngOnInit() {
    if(this.orderService && this.orderService.cartOrderCounter) {
      this.orderService.cartOrderCounter.forEach(item => {
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
      if (this.orderService.cartOrderCounter && this.orderService.cartOrderCounter.length > 0) {
        this.authService.openBuyPopup();
      }
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
      if (this.orderService.cartOrderCounter.length === 0) {
        let modalModel = new ModalModel();
        modalModel.type = ModalTypeEnum.warning;
        modalModel.body = this.langService.translate('Cart is empty!');
        modalModel.displayBody = true;
        this.showNotification(modalModel);
        return;
      }
      this.openConfirmation();
  }

  showNotification(modalModel: ModalModel): void {
    const dialogRef = this.modalService.open(NotificationModalComponent, {
      width: '500px',
      height: '45px',
      panelClass: 'noti-modalbox',
      position: { top: '0px' },
      data: {modalModel: modalModel}
    });
  }
}
