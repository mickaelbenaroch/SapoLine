import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ItemModel } from 'src/app/models/ItemModel';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-items-displayer',
  templateUrl: './items-displayer.component.html',
  styleUrls: ['./items-displayer.component.scss']
})
export class ItemsDisplayerComponent implements OnInit {

  @Input() items: ItemModel[] = [];
  @Output() buyClickEvent: EventEmitter<ItemModel> = new EventEmitter();
  constructor(public _DomSanitizationService: DomSanitizer) { }

  ngOnInit() {
  }

  Buy(item: ItemModel): void {
    if (item) {
      this.buyClickEvent.emit(item);
    }
    console.log("item clicked" + item);
  }

}
