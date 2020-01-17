import { Component, OnInit, Inject } from '@angular/core';
import { ModalTypeEnum } from 'src/app/enums/modal-type-enum';
import { ModalModel } from 'src/app/models/ModalModel';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpServiceService } from 'src/app/services/http-service/http-service.service';
import { TranslateServiceService } from 'src/app/services/translate/translate-service.service';
import { ItemModel } from 'src/app/models/ItemModel';
import { LanguageEnum } from 'src/app/enums/language-enum';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.scss']
})
export class NotificationModalComponent implements OnInit {

  public typeEnum = ModalTypeEnum;
  public modalModel: ModalModel = new ModalModel();
  public languageEnum  = LanguageEnum;

  constructor(public dialogRef: MatDialogRef<NotificationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NotificationModalComponent,
    public httpService: HttpServiceService,
    public translateService: TranslateServiceService) { 
      this.modalModel = this.data.modalModel;
    }

  ngOnInit() {
  let temp = this.modalModel;
    setTimeout(() => {
      this.close();
    }, 5000);
  }

  close(): void {
    this.dialogRef.close();
  }
}
