import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import {AuthService} from '../auth.service'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  filedTextType: boolean = false;


  constructor( private myRoute : Router, private auth : AuthService, private toastr : ToastrService) { }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+\=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]),
    password: new FormControl('', [Validators.required, Validators.pattern("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$")]),
    remember: new FormControl('')
  })

  get email():any{ return this.loginForm.get("email") }
  get password():any{ return this.loginForm.get("password")}

  ngOnInit(): void {
  }

  loginData(){
    if(this.loginForm.valid){
      this.showSuccess();
      this.auth.sendToken(this.loginForm.value.email);
      this.myRoute.navigate(["home"])
    }
  }
  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!', {
      progressBar: true
    });
  }
  
  toggleFieldTextType(){
    this.filedTextType = !this.filedTextType
  }

}
