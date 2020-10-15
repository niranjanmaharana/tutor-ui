import { Component, OnInit } from '@angular/core';
import { MenuUtilityService } from './services/menu-utility.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular Bootstap Template';
  constructor(public menu: MenuUtilityService, public auth: AuthService) { }

  ngOnInit() {
    this.auth.checkSessionToken();
  }

  onContinueSessionClick() {
    this.auth.continueSession();
  }

  onLogoutSessionClick() {
    this.auth.invalidateSession();
  }
}
