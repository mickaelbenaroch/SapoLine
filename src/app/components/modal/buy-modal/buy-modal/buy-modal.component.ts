import { Component, OnInit, Inject } from '@angular/core';
import { ItemModel } from 'src/app/models/ItemModel';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpServiceService } from 'src/app/services/http-service/http-service.service';
import { UserModel } from 'src/app/models/UserModel';
import { TranslateServiceService } from 'src/app/services/translate/translate-service.service';
import { LanguageEnum } from 'src/app/enums/language-enum';
import { OrderModel } from 'src/app/models/OrderModel';
import { OrderStatusEnum } from 'src/app/enums/order-status-enum';
import { OrderServiceService } from 'src/app/services/order/order-service.service';

@Component({
  selector: 'app-buy-modal',
  templateUrl: './buy-modal.component.html',
  styleUrls: ['./buy-modal.component.scss']
})
export class BuyModalComponent implements OnInit {

  public item: ItemModel;
  public fnameError: boolean;
  public lnameError: boolean;
  public emailError: boolean;
  public phoneError: boolean;
  public addressError: boolean;
  public address: string;
  public fname: string;
  public lname: string;
  public email: string;
  public phone: string;
  public OrderModel: OrderModel;
  public languageEnum = LanguageEnum;
  constructor(public dialogRef: MatDialogRef<BuyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BuyModalComponent,
    public httpService: HttpServiceService,
    public translateService: TranslateServiceService,
    public orderService: OrderServiceService) { 
      this.item = this.data.item;
    }

  ngOnInit() {
  }

  send(): void {
    console.log("send clicked!");
    if (this.fname === '' || this.fname == undefined) {
      this.fnameError = true;
    }
    if (this.lname === '' || this.lname == undefined) {
      this.lnameError = true;
    }
    if (this.email === '' || this.email == undefined || !this.validateEmail(this.email)) {
      this.emailError = true;
    }
    if (this.phone === '' || this.phone == undefined || !this.validatePhone()) {
      this.phoneError = true;
    }
    if (this.address === '' || this.address == undefined) {
      this.addressError = true;
    }
    console.log("success");
    let userModel = new UserModel();
    userModel.first_name = this.fname;
    userModel.last_name = this.lname;
    userModel.email = this.email;
    userModel.phone = this.phone;
    userModel.address = this.address;
    this.OrderModel = new OrderModel();
    let now = new Date();
    let month = now.getMonth();
    let year = now.getFullYear();
    this.OrderModel.date = (now.getDate()).toString() + '/' + (month + 1).toString() + '/' + year.toString();
    this.OrderModel.order_id = Math.round(now.getTime()).toString();
    this.OrderModel.status = OrderStatusEnum.WaitingConfirmation;
    this.OrderModel.user = userModel;
    if (this.orderService.cartOrderCounter && this.orderService.cartOrderCounter.length > 0) {
      this.OrderModel.orderItem = this.orderService.cartOrderCounter;
    } else {
      return;
    }
    this.orderService.order(this.OrderModel);
  }

  validateEmail(email) : boolean {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validatePhone(): boolean {
    return this.phone.match(/\d/g).length===10;
  }

  isOnlyNumbers(value): boolean {
    return /^\d+$/.test(value);
  }

  disableError(subject: string) : void {
    if (subject) {
      switch(subject) {
        case 'fname':
        this.fnameError = false;
        break;
        case 'lname':
        this.lnameError = false;
        break;
        case 'email':
        this.emailError = false;
        break;
        case 'address':
        this.addressError = false;
        break;
      }
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
