import { Injectable } from '@angular/core';
import { LoginModel } from 'src/app/models/LoginModel';
import { HttpServiceService } from '../http-service/http-service.service';
import { MatDialog } from '@angular/material/dialog';
import { GeneralDialogPopupComponent } from 'src/app/components/modal/general/general-dialog-popup/general-dialog-popup.component';
import { Router } from '@angular/router';
import { AuthStatusEnum } from 'src/app/enums/auth-status-enum';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private token: string;
  private exp: number;
  public loginModel: LoginModel;
  private timeStamp: number;
  public authStatus: AuthStatusEnum;
  constructor(private httpService: HttpServiceService,
              private modalService: MatDialog,
              private router: Router) { }

  signin(user: LoginModel, goToCart?: boolean): void {
    if (user && user.email && user.password) {
      this.httpService.httpPost('login/signin', user).subscribe(res => {
        if (res && res.isValid && res.data && res.data.token) {
          this.timeStamp = new Date().getTime();
          this.token = res.data.token;
          this.exp = res.data.maxAge;
          this.saveAuthDetails();
          if (goToCart) {
            this.router.navigateByUrl('/cart');
          }
        } else {
          this.openErrorModal();
        }
      }, err => {
        this.openErrorModal();
      });
    } 
  } 

  signUp(user: LoginModel, goToCart?: boolean): void {
    if (user && user.email && user.password) {
      this.httpService.httpPost('login/newuser', user).subscribe(res => {
        if (res && res.isValid && res.data && res.data.token) {
          this.timeStamp = new Date().getTime();
          this.token = res.data.token;
          this.exp = res.data.maxAge;
          this.saveAuthDetails();
          if (goToCart) {
            this.router.navigateByUrl('/cart');
          }
        } else {
          if (res && !res.isValid) {
            this.openErrorModal(res.error);
          }
        }
      }, err => {
        this.openErrorModal();
      });
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

  getToken(): string {
    return this.token;
  }
  
  getExp(): number {
    return this.exp;
  }

  getAuthStatus(): AuthStatusEnum {
    let status: AuthStatusEnum = AuthStatusEnum.Unauthorized;
    let now = new Date().getTime();
    if (!this.timeStamp) {
      status = AuthStatusEnum.Unauthorized;
      return status;
    } else {
      let diff = now - this.timeStamp;
      if (this.token && diff < this.exp ) {
        status = AuthStatusEnum.Authorized;
      } else if (this.token && diff < this.exp) {
        status = AuthStatusEnum.NeedRefresh;
      } else {
        status = AuthStatusEnum.Authorized;
      }
      return status;
    }
  }
  saveAuthDetails(): void {
    if (this.token && this.exp) {
      sessionStorage.setItem('token',this.token);
      sessionStorage.setItem('exp', this.exp.toString());
    }
  }
}
