import { Component, OnInit } from '@angular/core';
import { routeAnimation } from "../../../route.animation";
import { Router, ActivatedRoute } from "@angular/router";
import { BaseService } from "../../../../provide/base-service";
import { DataService } from "../../../../provide/data-service";
import { UserService } from "../../../../provide/user-service";
import * as _ from 'lodash';

@Component({
  selector: 'ms-add-sale-users',
  templateUrl: './add-sale-users.component.html',
  styleUrls: ['./add-sale-users.component.scss'],
  host: {
    '[@routeAnimation]': 'true'
  },
  animations: [ routeAnimation ]
})
export class AddSaleUsersComponent implements OnInit {
  id: string;
  url: string;
  token: string;
  userData: any = {};
  stateList: any;
  isLoading: boolean = false;
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public baseService: BaseService,
    public dataService: DataService,
    public userService: UserService
  ) {
    this.stateList = [  { id: 0, name: 'Active', state: true },
                        { id: 1, name: 'Inative', state: false }
                    ];
    this.userData.status = false;
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('item');
    this.url = this.baseService.userURL;
    this.token = sessionStorage.getItem('token');
    if (this.id) {
      this.getSalesUserData(this.id);
    }
  }

  viewUsers() {
    this.router.navigate(['dashboard/sales-point/view-sale-users']);
  }

  getSalesUserData(id) {
    this.isLoading = true;
    this.dataService.getData(this.url + "/" + id, this.token)
      .subscribe(
        (data) => {
          this.isLoading = false;
          this.userData = data;
          return true;
        },
        err => {
          this.isLoading = false;
          return true;
        });
  }

  submit() {
    this.id ? this.putUserData() : this.postUserData();
  }

  postUserData() {
    this.isLoading = true;
    this.userData.access = '2';
    this.userService.signup(this.userData)
      .subscribe(
        (data) => {
          this.router.navigate(['dashboard/sales-point/view-sale-users']);
          return true;
        },
        error => {
          this.isLoading = false;
          return true;
        });
  }

  putUserData() {
    this.isLoading = true;
    this.userService.updateProfile(this.url, this.id, this.userData, this.token)
      .subscribe(
        (data) => {
          this.isLoading = false;
          this.router.navigate(['dashboard/sales-point/view-sale-users']);
          return true;
        },
        error => {
          this.isLoading = false;
          return true;
        });
  }

  getEscaped(text: string) {
    return _.escape(text);
  }

}
