import { Injectable } from '@angular/core';
import { OrderModel } from 'src/app/models/OrderModel';
import { HttpServiceService } from '../http-service/http-service.service';
import { HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ModalModel } from 'src/app/models/ModalModel';
import { NotificationModalComponent } from 'src/app/components/modal/notification/notification-modal/notification-modal.component';
import { TranslateServiceService } from '../translate/translate-service.service';
import { ModalTypeEnum } from 'src/app/enums/modal-type-enum';
import { ItemModel } from 'src/app/models/ItemModel';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  public currentViewedItem: ItemModel;
  public cartOrderCounter: ItemModel[] = [];
  constructor(public httpService: HttpServiceService,
              public modalService: MatDialog,
              public langService: TranslateServiceService) { }

  order(order: OrderModel): void {
    this.httpService.httpPost('order', order, true).subscribe(
      res => {
        if (res && res.isValid && res.isValid.order) {
          //order has been created successfully
          let modalModel: ModalModel = new ModalModel();
           modalModel.body = this.langService.translate('Order number: ') + order.order_id + this.langService.translate('Was created Successfully!');
           modalModel.displayBody = true;
           modalModel.type = ModalTypeEnum.success;
        }
      },
      err => {
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
    });
}
}
