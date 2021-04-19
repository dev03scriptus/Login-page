import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from './auth.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private myRoute : Router, private auth : AuthService ) { }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+\=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]),
    password: new FormControl('', [Validators.required]),
    remember: new FormControl('', [Validators.required])
  })

  get email():any{ return this.loginForm.get("email") }
  get password():any{ return this.loginForm.get("password")}
  get remember():any{ return this.loginForm.get("remember") }

  ngOnInit(): void {
  }

  loginData(){
    if(this.loginForm.valid){
      this.auth.sendToken(this.loginForm.value.email);
      this.myRoute.navigate(["home"])
    }
    console.log(this.loginForm.value);    
  }
}
