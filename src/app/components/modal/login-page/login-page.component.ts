import { Component, Inject, OnInit } from '@angular/core';
import { TranslateServiceService } from 'src/app/services/translate/translate-service.service';
import { LanguageEnum } from 'src/app/enums/language-enum';
import { LoginModel } from 'src/app/models/LoginModel';
import { AuthServiceService } from 'src/app/services/authentication/auth-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthStatusEnum } from 'src/app/enums/auth-status-enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public languageEnum = LanguageEnum;
  public loginModel: LoginModel = new LoginModel();
  public confirmPassword: string;
  public signUpMode: boolean;
  public passwordError: boolean;
  public passwordConfirmError: boolean;
  public emailError: boolean;
  public noRedirect: boolean;

  constructor(public translateService: TranslateServiceService, 
              public authService: AuthServiceService,
              public dialogRef: MatDialogRef<LoginPageComponent>,
              @Inject(MAT_DIALOG_DATA) public data: LoginPageComponent,
              private router: Router) {
                this.signUpMode = this.data.signUpMode;
                this.noRedirect = this.data.noRedirect;
              }

  ngOnInit() {}
  
  toggleMode(): void {
    this.signUpMode = !this.signUpMode;
  }
  switchToRegister(): void {
    if (!this.signUpMode) {
      this.signUpMode = true;
    }
  }
  forgotPassword(): void {
    //TODO: forgot password API
  }
  submit(): void {
    if (!this.loginModel || !this.loginModel.email || !this.loginModel.password) {
      this.emailError = true;
      this.passwordError = true;
      return;
    } else {
      if (!this.validateEmail()) {
        this.emailError = true;
        return;
      }
      if (this.loginModel.password && this.loginModel.password.length < 8) {
        this.passwordError = true;
        return;
      }
      if (this.signUpMode && this.confirmPassword !== this.loginModel.password) {
          this.passwordConfirmError = true;
          return;
      }
    }
    //Everything passed
    if (this.signUpMode) {
      this.completeSignUp();
    } else {
      this.completeSignIn();
    }

  }
  disableErrors(label: string): void {
    switch(label) {
      case 'email':
      this.emailError = false;
      break;
      case 'password':
      this.passwordError = false;
      break;
      case 'confirmPassword':
      this.passwordConfirmError = false;
      break;
    }
  }
  validateEmail() : boolean {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(this.loginModel.email).toLowerCase());
  }
  completeSignUp(): void {
    if (this.loginModel && this.loginModel.password && this.loginModel.email) {
      if (this.noRedirect) {
        this.authService.signUp(this.loginModel);
      }
      this.close();
    }
  }
  completeSignIn(): void {
    if (this.loginModel && this.loginModel.password && this.loginModel.email) {
      this.authService.signin(this.loginModel);
      this.close();
    }
  }
  close(param? :any) {
    if (param) {
      this.dialogRef.close(param);
    } else {
      this.dialogRef.close();
    }
  } 
}
