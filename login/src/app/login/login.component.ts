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
        const emailIndex = user.findIndex((item:any) => item.email == this.loginForm.controls['email'].value && item.password == this.loginForm.controls['password'].value)
        console.log("emailIndex",emailIndex);
        
        if(emailIndex !== -1){
          this.showSuccess("sucessfully Loggedin")
          this.auth.sendToken(this.loginForm.controls['email'].value)
          this.myRoute.navigate(['home'])
        }
        const emailValidation = user.findIndex((item:any) => item.email == this.loginForm.controls['email'].value)
        console.log("emailValidation",emailValidation);
        if(emailValidation == -1){
          this.showError("email is Invalid")
        }
        const passwordValidation = user.findIndex((item:any) => item.password == this.loginForm.controls['password'].value)
        console.log("passwordValidation",passwordValidation);
        
        if(passwordValidation == -1){
           this.showError("password Invalid")
        }
      } 
    }
  }

  canExit(): boolean{
    if(this.auth.isLoggedIn()){
      return true
    }
    else{
      return false
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
