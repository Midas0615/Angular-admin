import { Component, OnInit } from '@angular/core';
import { routeAnimation } from "../../../route.animation";
import { Router, ActivatedRoute } from "@angular/router";
import { BaseService } from "../../../../provide/base-service";
import { DataService } from "../../../../provide/data-service";
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
  page_title: string = 'Add user of the sales team'
  id: string;
  url: string;
  salesUserData: any;
  stateList: any;
  isLoading: boolean = false;
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public baseService: BaseService,
    public dataService: DataService
  ) {
    this.salesUserData = { first_name: '', sales_email: '', password: '', phone: '', state: '' };
    this.stateList = [  { id: 0, name: 'Active', state: true },
                        { id: 1, name: 'Inative', state: false }
                    ];
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('item');
    this.url = this.baseService.salesUserURL;
    console.log('item', this.id);
    if (this.id) {
      this.getSalesUserData(this.id);
    } else {
      this.salesUserData = { first_name: '', sales_email: '', password: '', phone: '', state: '' };
    }
  }

  getSalesUserData(id) {
    this.isLoading = true;
    this.dataService.getData(this.url + "/" + id)
      .subscribe(
        (data) => {
          this.isLoading = false;
          console.log('userData', data);
          this.salesUserData = data;
          return true;
        },
        err => {
          this.isLoading = false;
          console.log('errorData', err);
          return true;
        });
  }

  submit() {
    console.log(this.salesUserData);
    this.id ? this.putUserData() : this.postUserData();
  }

  postUserData() {
    this.isLoading = true;
    this.dataService.postData(this.url, this.salesUserData)
      .subscribe(
        (data) => {
          console.log('userData', data);
          this.router.navigate(['saleTeam-manage/view-sale-users']);
          return true;
        },
        error => {
          this.isLoading = false;
          console.log('errorData', error);
          return true;
        }
      )
  }

  putUserData() {
    this.isLoading = true;
    this.dataService.patchData(this.url, this.id, this.salesUserData)
      .subscribe(
        (data) => {
          console.log('userData', data);
          this.router.navigate(['saleTeam-manage/view-sale-users']);
          return true;
        },
        error => {
          this.isLoading = false;
          console.log('errorData', error);
          return true;
        }
      )
  }

  getEscaped(text: string) {
    return _.escape(text);
  }

}
