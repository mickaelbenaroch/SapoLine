import { Component, OnInit } from '@angular/core';
import { CategoryEnum } from 'src/app/enums/categories-enum';
import { Router } from '@angular/router';
import { TranslateServiceService } from 'src/app/services/translate/translate-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { LanguageEnum } from 'src/app/enums/language-enum';
import { LoginPageComponent } from '../modal/login-page/login-page.component';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';
import { AuthStatusEnum } from 'src/app/enums/auth-status-enum';
import { OrderServiceService } from 'src/app/services/order/order-service.service';
import { ModalModel } from 'src/app/models/ModalModel';
import { NotificationModalComponent } from '../modal/notification/notification-modal/notification-modal.component';
import { ModalTypeEnum } from 'src/app/enums/modal-type-enum';
import { ItemModel } from 'src/app/models/ItemModel';
import { GeneralDialogPopupComponent } from '../modal/general/general-dialog-popup/general-dialog-popup.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public languageEnum = LanguageEnum;
  constructor(public router: Router,
              public orderService: OrderServiceService,
              public langService: TranslateServiceService,
              public _DomSanitizationService: DomSanitizer,
              public modalService: MatDialog,
              public authService: AuthServiceService) { }

  ngOnInit() {
    this.orderService.updateTotalCost();
  }

  parsePrice(price: string): number {
    if (price.includes('₪')) {
      price = price.substring(0, price.length - 1);
   } else {
    price = price.substring(0, price.length - 3);
   }
   price = price.replace(',', '.');
    return Number(price);
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
        minHeight: '440px',
        data: { signUpMode: signUpMode }
      });
      break;
      case AuthStatusEnum.NeedRefresh:
      signUpMode = false;
      const dialogRef2 = this.modalService.open(LoginPageComponent, {
        width: '320px',
        minHeight: '440px',
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
          case CategoryEnum.Account:
              this.router.navigateByUrl('account');    
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
  removeItem(item: ItemModel): void {
    let message = item.name;
    this.openDeleteConfirmationModal(message, item);
  }
  openDeleteConfirmationModal(message: string, item: ItemModel): void {
    const dialogRef = this.modalService.open(GeneralDialogPopupComponent, {
      width: '360px',   
      height: '303px',
      panelClass: 'generic-error-class',
      data: {message: message, twoButtons: true }
    }).afterClosed().subscribe(del => {
      if (del) {
        this.orderService.removeItemFromCart(item);
      }
    })
  }
}
