import { Component, OnInit } from '@angular/core';
import { ItemServiceService } from 'src/app/services/item-service/item-service.service';
import { ItemModel } from 'src/app/models/ItemModel';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {

  public currentItem: ItemModel;
  constructor(public itemService: ItemServiceService,
              public _DomSanitizationService: DomSanitizer,
              public router: Router) { }

  ngOnInit() {
    if (this.itemService.currentViewedItem) {
      this.currentItem = this.itemService.currentViewedItem;
    } else {
      this.router.navigateByUrl('/');
    }
  }

  buyItem(): void {
    if (this.currentItem) {
      this.itemService.openConfirmation(this.currentItem);
    }
  }

}
