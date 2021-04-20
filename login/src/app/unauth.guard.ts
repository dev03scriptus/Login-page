import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import {AuthService} from './auth.service'
import { Router } from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanActivate {

  constructor(private auth: AuthService, private myRoute: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(!this.auth.isLoggedIn){
        this.myRoute.navigate(['login']);
        return true
      }
      return false
  }
}
