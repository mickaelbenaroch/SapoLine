import { Injectable } from '@angular/core';
import { ItemModel } from 'src/app/models/ItemModel';
import { MatDialog } from '@angular/material/dialog';
import { BuyModalComponent } from 'src/app/components/modal/buy-modal/buy-modal/buy-modal.component';
import { ModalModel } from 'src/app/models/ModalModel';
import { NotificationModalComponent } from 'src/app/components/modal/notification/notification-modal/notification-modal.component';
import { OrderServiceService } from '../order/order-service.service';

@Injectable()
export class ItemServiceService { 
  constructor(public modalService: MatDialog,
              public orderService: OrderServiceService) { }

  openConfirmation(item: ItemModel): void {
      const dialogRef = this.modalService.open(BuyModalComponent, {
        width: '550px',
        data: {item: item }
      });
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
  addToCart(item: ItemModel): void {
     if(item) {
        this.orderService.cartOrderCounter.push(item);
     }
  }
}
