import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ItemModel } from 'src/app/models/ItemModel';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ItemServiceService } from 'src/app/services/item-service/item-service.service';
import { TranslateServiceService } from 'src/app/services/translate/translate-service.service';
import { LanguageEnum } from 'src/app/enums/language-enum';

@Component({
  selector: 'app-items-displayer',
  templateUrl: './items-displayer.component.html',
  styleUrls: ['./items-displayer.component.scss']
})
export class ItemsDisplayerComponent implements OnInit {

  @Input() items: ItemModel[] = [];
  @Output() buyClickEvent: EventEmitter<ItemModel> = new EventEmitter();
  public languageEnum = LanguageEnum;
  constructor(public _DomSanitizationService: DomSanitizer,
              public router: Router,
              public itemService: ItemServiceService,
              public langService: TranslateServiceService) { }

  ngOnInit() {
  }

  enterItem(item: ItemModel): void {
    if (item) {
      this.itemService.currentViewedItem = item;
      this.router.navigateByUrl('itemDetail');
    }
    console.log("item clicked" + item);
  }

}
