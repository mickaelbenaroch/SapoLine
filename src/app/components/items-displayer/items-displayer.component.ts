import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ItemModel } from 'src/app/models/ItemModel';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ItemServiceService } from 'src/app/services/item-service/item-service.service';
import { TranslateServiceService } from 'src/app/services/translate/translate-service.service';
import { LanguageEnum } from 'src/app/enums/language-enum';
import { OrderServiceService } from 'src/app/services/order/order-service.service';

@Component({
  selector: 'app-items-displayer',
  templateUrl: './items-displayer.component.html',
  styleUrls: ['./items-displayer.component.scss']
})
export class ItemsDisplayerComponent implements OnInit, OnChanges {

  @Input() items: ItemModel[] = [];
  @Output() buyClickEvent: EventEmitter<ItemModel> = new EventEmitter();
  public languageEnum = LanguageEnum;
  constructor(public _DomSanitizationService: DomSanitizer,
              public router: Router,
              public itemService: ItemServiceService,
              public orderService: OrderServiceService,
              public langService: TranslateServiceService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.items && this.items.length > 0) {
      this.splitPictures();
    }
  }

  enterItem(item: ItemModel): void {
    if (item) {
      this.orderService.currentViewedItem = item;
      this.router.navigateByUrl('itemDetail');
    }
    console.log("item clicked" + item);
  }

  splitPictures(): void {
    this.items.forEach(item => {
      if (item && item.picture && item.picture.includes('+')) {
        let temp = item.picture.split('+');
        item.mainPicture = temp[0];
      } else if (item && item.picture && !item.picture.includes('+')) {
        item.mainPicture = item.picture;
      }
    });
  }

}
