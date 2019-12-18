import { Component, OnInit, Inject } from '@angular/core';
import { ItemModel } from 'src/app/models/ItemModel';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpServiceService } from 'src/app/services/http-service/http-service.service';
import { UserModel } from 'src/app/models/UserModel';

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
  public streetError: boolean;
  public houseNumberError: boolean;
  public cityError: boolean;
  public postalCodeError: boolean;
  public fname: string;
  public lname: string;
  public email: string;
  public phone: string;
  public street: string;
  public houseNumber: string;
  public city: string;
  public postalCode: string;
  constructor(public dialogRef: MatDialogRef<BuyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BuyModalComponent,
    public httpService: HttpServiceService) { 
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
    if (this.street === '' || this.street == undefined) {
      this.streetError = true;
    }
    if (this.houseNumber === '' || this.houseNumber == undefined || !this.isOnlyNumbers(this.houseNumber)) {
      this.houseNumberError = true;
    }
    if (this.city === '' || this.city == undefined) {
      this.cityError = true;
    }
    if (this.postalCode === '' || this.postalCode == undefined || !this.isOnlyNumbers(this.houseNumber)) {
      this.postalCodeError = true;
    }
    console.log("success");
    let userModel = new UserModel();
    userModel.first_name = this.fname;
    userModel.last_name = this.lname;
    userModel.email = this.email;
    userModel.phone = this.phone;
    userModel.address = this.houseNumber + ' ' + this.street + ' ' + this.city + ' ' + this.postalCode;
    userModel.item_id = this.item.id;
    this.httpService.httpPost('user/new', userModel).subscribe(
      res => {
        debugger;
        let temp = res;
      },
      err => {
        console.log(err);
      }
    )
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
        case 'street':
        this.streetError = false;
        break;
        case 'houseNumber':
        this.houseNumberError = false;
        break;
        case 'postalCode':
        this.postalCodeError = false;
        break;
        case 'phone':
        this.phoneError = false;
        break;
        case 'city':
        this.cityError = false;
        break;
      }
    }
  }
}
