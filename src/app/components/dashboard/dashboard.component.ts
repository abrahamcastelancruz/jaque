import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.styl'],
})
export class DashboardComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  logOut() {
    this.auth.logOut();
  }
}
