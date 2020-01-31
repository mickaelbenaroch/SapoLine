import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './services/authentication/auth-service.service';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { LoginPageComponent } from './components/modal/login-page/login-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sapo';
  constructor(private authService: AuthServiceService,
              private modalService: MatDialog) {}
  ngOnInit(): void {
    let token = sessionStorage.getItem('token');
    this.authService.isUserAlive(token).subscribe(
      res => {
        if (token && res) {
          this.authService.setToken(token);
        } else {
          //this.openLoginPopup(true);
        }
      }, err => {
        this.openLoginPopup(true);
      });
    }

    openLoginPopup(noRedirect: boolean): void {
      const dialogRef = this.modalService.open(LoginPageComponent, {
        width: '320px',
        height: '450px',
        data: { signUpMode: false, noRedirect: noRedirect}
      });
    }
  }

