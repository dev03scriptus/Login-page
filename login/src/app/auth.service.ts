import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import {ToastrService} from 'ngx-toastr'
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private myRoute : Router, private toastr : ToastrService, private http: HttpClient) { 
  }

  sendToken(token:string){
    localStorage.setItem("loggedInUser", token)
  }

  getToken(){
    return localStorage.getItem("loggedInUser")
  }

  isLoggedIn(){
    return this.getToken() !== null;
  }

  logOut(){
    localStorage.removeItem("loggedInUser");
    this.showSuccess("You are logged out")
    this.myRoute.navigate(["/login"]);
  }

  showSuccess(message:any) {
    this.toastr.success(message)
  }

  registerUser(registerValue: string){
    localStorage.setItem("register", registerValue )
  }

  getRegisterUser(){
    return localStorage.getItem("register")
  }

  getUserData(){
    return this.http.get('https://jsonplaceholder.typicode.com/users')
  }
}
