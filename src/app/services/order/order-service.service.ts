import { Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemModel } from 'src/app/models/ItemModel';
import { OrderModel } from 'src/app/models/OrderModel';
import { ModalModel } from 'src/app/models/ModalModel';
import { ModalTypeEnum } from 'src/app/enums/modal-type-enum';
import { HttpServiceService } from '../http-service/http-service.service';
import { TranslateServiceService } from '../translate/translate-service.service';
import { PaymentMethodsComponent } from 'src/app/components/modal/payment-methods/payment-methods.component';
import { NotificationModalComponent } from 'src/app/components/modal/notification/notification-modal/notification-modal.component';
import { GeneralDialogPopupComponent } from 'src/app/components/modal/general/general-dialog-popup/general-dialog-popup.component';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService implements OnInit {

  public currentViewedItem: ItemModel;
  public total: number = 0;
  public cartOrderCounter: ItemModel[] = [];
  constructor(public httpService: HttpServiceService,
    public modalService: MatDialog,
    public langService: TranslateServiceService) { }

  ngOnInit(): void {
    if (this.cartOrderCounter) {
      this.total = 0;
      this.cartOrderCounter.forEach(item => {
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
        this.total += (Number(fixed) * Number(item.quantity));
      });
    }
  }
  updateTotalCost(): void {
    this.ngOnInit();
  }
  order(order: OrderModel): void {
    if (this.total) {
      order.total = this.total;
    }
    this.httpService.httpPost('order', order, true).subscribe(
      (res: any) => {
        if (res && res.isValid && res.order) {
          //order has been created successfully
          let modalModel: ModalModel = new ModalModel();
          modalModel.body = this.langService.translate('Order number: ') + order.order_id + this.langService.translate('Was created Successfully!');
          modalModel.displayBody = true;
          modalModel.type = ModalTypeEnum.success;
          this.modalService.closeAll();
          this.cartOrderCounter = [];
          this.total = 0;
          this.showNotification(modalModel);
        }
      },
      err => {
        this.modalService.closeAll();
        this.openErrorModal();
        console.log(err);
      }
    )
  }

  showNotification(modalModel: ModalModel): void {
    const dialogRef = this.modalService.open(NotificationModalComponent, {
      width: '500px',
      height: '45px',
      panelClass: 'noti-modalbox',
      position: { top: '0px' },
      data: { modalModel: modalModel }
    }).afterClosed().subscribe(() => {
      this.openPaymentPopup();
    });
  }

  showNotificationWithNoPaymentAfter(modalModel: ModalModel): void {
    const dialogRef = this.modalService.open(NotificationModalComponent, {
      width: '500px',
      height: '45px',
      panelClass: 'noti-modalbox',
      position: { top: '0px' },
      data: { modalModel: modalModel }
    });
  }

  openPaymentPopup(): void {
    const dialogRef2 = this.modalService.open(PaymentMethodsComponent, {
      width: '470px',
      height: '450px',
      id: '#openDialog',
      data: {}
    });
  }

  openErrorModal(message?: string): void {
    const dialogRef3 = this.modalService.open(GeneralDialogPopupComponent, {
      width: '360px',
      height: '303px',
      panelClass: 'generic-error-class',
      data: { message: message }
    });
  }
  removeItemFromCart(item: ItemModel): void {
    if (item && this.cartOrderCounter && this.cartOrderCounter.find(it => it.name === item.name)) {
      const index = this.cartOrderCounter.indexOf(item);
      if (index > -1) {
        this.cartOrderCounter.splice(index, 1);
      }
      let price = item.price;
      price = price.replace(',', '.'); 
      if (price.includes('₪')) {
        price = price.substring(0, price.length - 1);
      } else {
        price = price.substring(0, price.length - 3);
      }
      this.total -= Number(price) * item.quantity;
      let modalModel = new ModalModel();
      modalModel.body = this.langService.translate('item has been removed');
      modalModel.type = ModalTypeEnum.success;
      modalModel.displayBody = true;
      this.showNotificationWithNoPaymentAfter(modalModel);
    }
  }
}
