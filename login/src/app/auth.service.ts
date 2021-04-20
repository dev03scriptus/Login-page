import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private myRoute : Router) { 
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
    this.myRoute.navigate(["/login"]);
  }

  registerUser(registerValue: string){
    localStorage.setItem("register", registerValue )
  }

  getRegisterUser(){
    return localStorage.getItem("register")
  }
}
