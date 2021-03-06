import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiUser } from './../../../models/apiUser.model';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.styl'],
})
export class UsersComponent implements OnInit {
  users: ApiUser[] = [];
  displayedColumns: string[] = [
    'id',
    'first_name',
    'last_name',
    'email',
    'gender',
    'image',
  ];
  dataSource = new MatTableDataSource<ApiUser>(this.users);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.getUsers();
    console.log(this.dataSource);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter() {
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getUsers() {
    this.userService.listUsers().subscribe((res: any) => {
      this.dataSource.data = res.users;
    });
  }
}
