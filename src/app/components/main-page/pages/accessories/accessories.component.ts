import { Component, OnInit } from '@angular/core';
import { CategoryEnum } from 'src/app/enums/categories-enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.scss']
})
export class AccessoriesComponent implements OnInit {

  public currentItemPage: CategoryEnum;
  constructor(public router: Router) { }

  ngOnInit() {
  }

  itemMenuClicked(ev: CategoryEnum): void {
    if (ev) {
      this.currentItemPage = ev;
      switch(ev) {
        case CategoryEnum.Shoes:
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
      }
    }
  }
}
