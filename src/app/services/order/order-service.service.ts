import { Injectable, OnInit } from '@angular/core';
import { OrderModel } from 'src/app/models/OrderModel';
import { HttpServiceService } from '../http-service/http-service.service';
import { HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ModalModel } from 'src/app/models/ModalModel';
import { NotificationModalComponent } from 'src/app/components/modal/notification/notification-modal/notification-modal.component';
import { TranslateServiceService } from '../translate/translate-service.service';
import { ModalTypeEnum } from 'src/app/enums/modal-type-enum';
import { ItemModel } from 'src/app/models/ItemModel';
import { PaymentMethodsComponent } from 'src/app/components/modal/payment-methods/payment-methods.component';
import { GeneralDialogPopupComponent } from 'src/app/components/modal/general/general-dialog-popup/general-dialog-popup.component';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService implements OnInit{

  public currentViewedItem: ItemModel;
  public total: number = 0;
  public cartOrderCounter: ItemModel[] = [];
  constructor(public httpService: HttpServiceService,
              public modalService: MatDialog,
              public langService: TranslateServiceService) { }

  ngOnInit(): void {
    if(this.cartOrderCounter) {
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
        this.total += (Number(fixed) * Number(item.quantity))
      });
    }
  }
  updateTotalCost(): void {
    this.ngOnInit();
  }
  order(order: OrderModel): void {
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
    data: {modalModel: modalModel}
  }).afterClosed().subscribe(() => {
    this.openPaymentPopup();
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
    data: {message: message }
  });
}
}
