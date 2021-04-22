import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'
import { ToastrService } from 'ngx-toastr'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  filedTextType: boolean = false;

  loginUser: any = [];
  userEmail: any = [];

  constructor(
    private myRoute: Router,
    private auth: AuthService,
    private toastr: ToastrService
  ) {
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+\=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]),
    password: new FormControl('', [Validators.required, Validators.pattern("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$")]),
    remember: new FormControl('')
  })

  get email(): AbstractControl | null { return this.loginForm.get("email") }
  get password(): AbstractControl | null { return this.loginForm.get("password") }

  ngOnInit(): void {
  }

  loginData() {
    if (this.loginForm.valid) {
      const registerUser = localStorage.getItem("register")
      if (registerUser) {
        const user = JSON.parse(registerUser)
        for (let u of user) {
          if (u.email == this.loginForm.controls['email'].value && u.password == this.loginForm.controls['password'].value) {
            this.myRoute.navigate(['home'])
            this.loginUser.push(this.loginForm.value)
            this.auth.sendToken(JSON.stringify(this.loginUser))
            return this.showSuccess('You Are Successfully LoggedIn')
          }
          if(u.password !== this.loginForm.controls['password'].value && u.email !== this.loginForm.controls['email'].value){
            return this.showError("Your Email Address And Password Is Not Valid")
          }
          if(u.email !== this.loginForm.controls['email'].value){
            return this.showError("User Not Found")
          }
          if(u.password !== this.loginForm.controls['password'].value){
            return this.showError("Your Password Is Incorrect")
          }
        }
      }
    }
  }
  showSuccess(message:string) {
    this.toastr.success(message)
  }

  showError(message:string) {
    this.toastr.error(message)
  }

  toggleFieldTextType() {
    this.filedTextType = !this.filedTextType
  }

}
