import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import {AuthService} from './auth.service'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth : AuthService, private myRoute : Router, private toastr : ToastrService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
      if(this.auth.isLoggedIn()){
        return true;
      }
      else{
        this.showError("You may first login")
        this.myRoute.navigate(["login"]);
        return false;
      }
    }

    showError(message:any){
      this.toastr.error(message)
    }
}
