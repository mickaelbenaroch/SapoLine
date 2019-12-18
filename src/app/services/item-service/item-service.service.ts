import { Injectable } from '@angular/core';
import { ItemModel } from 'src/app/models/ItemModel';
import { MatDialog } from '@angular/material/dialog';
import { BuyModalComponent } from 'src/app/modal/buy-modal/buy-modal.component';

@Injectable()
export class ItemServiceService {
  public currentViewedItem: ItemModel;
  constructor(public modalService: MatDialog) { }

  openConfirmation(item: ItemModel): void {
      const dialogRef = this.modalService.open(BuyModalComponent, {
        width: '550px',
        data: {item: item }
      });
  }
}
