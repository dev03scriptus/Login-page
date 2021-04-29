import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators,NgModel } from '@angular/forms';
import { AuthService } from '../auth.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  deleteUser: Boolean = false
  tableHead = [
    {
      field: 'Name'
    },
    {
      field: 'User Name'
    },
    {
      field: 'City'
    },
    {
      field: 'Zip Code'
    },
    {
      field: 'Company Name'
    },
    {
      field: 'Phone'
    },
    {
      field: 'Lng'
    }
  ]

  deleteUserId: any[] = []
  removeData: any;
  checkUncheckField : FormControl = new FormControl('', Validators.required)
  disabledButton : boolean = false;
  constructor(
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.getUserValue()
  }
  userData: any;

  getUserValue() {
    this.auth.getUserData().subscribe(result => {
      this.userData = result
      for (let data of this.userData) {
        const addData = { ...data, checked: false }
      }
    })
  }

  checkUncheck(id: Number, value: boolean) {
    const index = this.userData.findIndex((item: any) => item.id == id)
    this.userData[index].checked = value
  }

  deleteData(event:any) {
    for (let item of this.userData) {
      if (item.checked == true) {
        const filterData = this.userData.filter((data:any ) => data.id !== item.id)
        this.userData = filterData
      }
    }
  }
}
