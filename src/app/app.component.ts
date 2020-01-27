import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './services/authentication/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sapo';
  constructor(private authService: AuthServiceService) {}
  ngOnInit(): void {
    let token = sessionStorage.getItem('token');
    if (token ) {
      this.authService.setToken(token);
    }
  }
}
