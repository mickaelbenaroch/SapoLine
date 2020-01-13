import { Component, OnInit } from '@angular/core';
import { CategoryEnum } from 'src/app/enums/categories-enum';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http-service/http-service.service';
import { ItemModel } from 'src/app/models/ItemModel';
import { TranslateServiceService } from 'src/app/services/translate/translate-service.service';

@Component({
  selector: 'app-shoes',
  templateUrl: './shoes.component.html',
  styleUrls: ['./shoes.component.scss']
})
export class ShoesComponent implements OnInit {
  public items: ItemModel[] = [];
  constructor(public router: Router, 
             public httpService: HttpServiceService,
             public langService: TranslateServiceService) { }

  ngOnInit() {
    let obj = {
      category_id: '10000'
    }
    this.httpService.httpPost("item/getItems",obj).subscribe(res => {
      this.items = res.item;
    })
  }

  itemMenuClicked(ev: string): void {
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
      }
    }
  }

  buyEvent(item: ItemModel): void {
    console.log(item);
  }

}
