import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators, NgModel } from '@angular/forms';
import { AuthService } from '../auth.service'
import { HeaderComponent } from '../header/header.component'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  deleteUser: Boolean = false
  searchData : any[] = []
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

  searchValue : any
  deleteUserId: any[] = []
  removeData: any;
  disabledButton: boolean = false;

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
        data = { ...data, checked: false}
        console.log(data);
      }      
      this.disabledButton = true
    })
  }
  
  checkUncheck(id: Number, value: boolean) {
    const index = this.userData.findIndex((item: any) => item.id == id)
    this.userData[index].checked = value
    const checkedAny = this.userData.findIndex((item: any) => item.checked === true)
    this.disabledButton = checkedAny > -1 ? false : true
  }
  
  deleteData(event: any) {
    for (let item of this.userData) {
      if (item.checked == true) {
        this.deleteUserId.push(item.id)
        const filterData = this.userData.filter((data: any) => data.id !== item.id)
        this.userData = filterData
      }
    }
  }

  addItem(value: any){    
      this.searchValue = this.userData.filter((item :any) => item.name.includes(value))
      console.log(this.searchValue);
      
      if(this.userData.name !== value){
        console.log("no data found");
      }
  }
}
