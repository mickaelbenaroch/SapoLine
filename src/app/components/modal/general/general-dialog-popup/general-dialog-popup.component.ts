import { Component, OnInit, Inject } from '@angular/core';
import { TranslateServiceService } from 'src/app/services/translate/translate-service.service';
import { LanguageEnum } from 'src/app/enums/language-enum';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-general-dialog-popup',
  templateUrl: './general-dialog-popup.component.html',
  styleUrls: ['./general-dialog-popup.component.scss']
})
export class GeneralDialogPopupComponent implements OnInit {

  public message: string;
  public languageEnum = LanguageEnum;
  public twoButtons: boolean;
  constructor(public translateService: TranslateServiceService,
              public dialogRef: MatDialogRef<GeneralDialogPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: GeneralDialogPopupComponent) {
                this.message = this.data.message;
                this.twoButtons = this.data.twoButtons;
               }

  ngOnInit() {
  }

  close(param?: any) : void {
    if (param) {
      this.dialogRef.close(param);
    } else {
      this.dialogRef.close();
    }
  }
}
