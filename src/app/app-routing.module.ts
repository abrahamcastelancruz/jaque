import { CarsComponent } from './components/tabs/cars/cars.component';
import { UsersComponent } from './components/tabs/users/users.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

// Guard

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: '/dashboard/(sideNav:users)', pathMatch: 'full' },
      { path: 'users', component: UsersComponent, outlet: 'sideNav' },
      { path: 'cars', component: CarsComponent, outlet: 'sideNav' },
    ],
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
