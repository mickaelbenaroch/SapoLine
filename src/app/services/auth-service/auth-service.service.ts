import { Injectable, OnInit } from '@angular/core';
import { LoginModel } from 'src/app/models/LoginModel';
import { HttpServiceService } from 'src/app/services/http-service/http-service.service';
import { MatDialog } from '@angular/material/dialog';
import { GeneralDialogPopupComponent } from 'src/app/components/modal/general/general-dialog-popup/general-dialog-popup.component';
import { Router } from '@angular/router';
import { AuthStatusEnum } from 'src/app/enums/auth-status-enum';
import { BuyModalComponent } from 'src/app/components/modal/buy-modal/buy-modal/buy-modal.component';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService implements OnInit {
  private token: string;
  private exp: number;
  public loginModel: LoginModel = new LoginModel();
  public authStatus: AuthStatusEnum;
  constructor(private httpService: HttpServiceService,
              private modalService: MatDialog,
              private router: Router) { }
  
  ngOnInit(): void {

  }

  signin(user: LoginModel, noRedirect?): Observable<boolean> {
    if (user && user.email && user.password) {
      return this.httpService.httpPost('login/signin', user).pipe(map(
        (res: any) => {
        if (res && res.isValid && res.data && res.data.token) {
          this.token = res.data.token;
          this.exp = res.data.maxAge;
          this.saveAuthDetails(user);
          if (!noRedirect) {
            this.openBuyPopup();
          }
          return true;
        } else {
          this.openErrorModal();
          return false;
        }
      }, err => {
        this.openErrorModal();
        return false;
      }));
    } else {
      return of(null);
    }
  } 

  signUp(user: LoginModel, noRedirect?): Observable<boolean> {
    if (user && user.email && user.password) {
      this.loginModel.email = user.email;
      return this.httpService.httpPost('login/newuser', user).pipe(map(
        (res: any) => {
        if (res && res.isValid && res.user && res.user.token) {
          this.token = res.user.token;
          this.exp = res.user.maxAge;
          this.saveAuthDetails(user);
          if (!noRedirect) {
            this.openBuyPopup();
          }
          return true;
        } else {
          if (res && !res.isValid) {
            this.openErrorModal(res.error);
            return false;
          }
        }
      }, err => {
        this.openErrorModal();
        return false;
    }))} else {
      return of(null)
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
  setToken(token: string) : void {
    if (token) {
      this.token = token;
    }
  }

  getToken(): string {
    return this.token;
  }
  
  getExp(): number {
    return this.exp;
  }

  getAuthStatus(): AuthStatusEnum {
    let status: AuthStatusEnum = AuthStatusEnum.Unauthorized;
    if (!sessionStorage.getItem('token') || !sessionStorage.getItem('email')) {
      status = AuthStatusEnum.Unauthorized;
      return status;
    } else {
        status = AuthStatusEnum.Authorized;
        return status;
    } 
  }

  saveAuthDetails(user): void {
      sessionStorage.setItem('token',this.token);
      sessionStorage.setItem('email', user.email);
  }

  getUserEmail(): string {
    if (sessionStorage.getItem('email')) {
      return sessionStorage.getItem('email');
    }
  }

  openBuyPopup(): void {
    const dialogRef = this.modalService.open(BuyModalComponent, {
      width: '550px',
      data: { }
    });""
  }

  public isUserAlive(token: string): Observable<boolean> {
    if(token) {
      return this.httpService.httpPost('login/checktoken', {check: "check"}, true).pipe(map(
        (res: any) => {
          if (res && res.isValid && res.token && res.token.isAlive) {
            return true;
          } else {
            return false;
          }
        }, err => {
          return false;
        }
      ))}
    return of(false);
  }
}
