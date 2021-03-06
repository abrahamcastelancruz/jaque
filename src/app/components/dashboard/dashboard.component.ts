import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  faUserAlt,
  faCar,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.styl'],
})
export class DashboardComponent implements OnInit {
  // Font Awesome Icons Properties
  faUser = faUserAlt;
  faCar = faCar;
  faLogOut = faSignOutAlt;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  // SignOut method & routing to login
  logOut() {
    this.auth.logOut();
    this.router.navigateByUrl('/login');
  }
}
