import { Component, OnInit } from '@angular/core';
import { ItemModel } from 'src/app/models/ItemModel';
import { LanguageEnum } from 'src/app/enums/language-enum';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http-service/http-service.service';
import { TranslateServiceService } from 'src/app/services/translate/translate-service.service';
import { CategoryEnum } from 'src/app/enums/categories-enum';
import { UserModel } from 'src/app/models/UserModel';
import { AuthServiceService } from 'src/app/services/authentication/auth-service.service';
import { GeneralDialogPopupComponent } from '../../modal/general/general-dialog-popup/general-dialog-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit {

  public languageEnum = LanguageEnum;
  public userModel: UserModel;
  constructor(public router: Router, 
             public httpService: HttpServiceService,
             public langService: TranslateServiceService,
             public authService: AuthServiceService,
             private modalService: MatDialog) { }

  ngOnInit() {
    let temp = this.authService.getUserEmail();
    this.httpService.httpPost('user/getuser', {email: temp}, true).subscribe(
      (res: any) => {
        if (res && res.data) {
          this.userModel = res.data;
        }
      },
      err => {
        this.openErrorModal();
      }
    )
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
          case CategoryEnum.Account:
            this.router.navigateByUrl('account');
          break;
      }
    }
  }

  openErrorModal(message?: string): void {
    const dialogRef = this.modalService.open(GeneralDialogPopupComponent, {
      width: '360px',   
      height: '303px',
      panelClass: 'generic-error-class',
      data: {message: message }
    });
  }
}
