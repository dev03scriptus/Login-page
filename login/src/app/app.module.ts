import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './auth.service';
import {AuthGuard} from './auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr'
import {UnauthGuard} from './unauth.guard'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
    bootstrap: [AppComponent,AuthService , AuthGuard, UnauthGuard]
})
export class AppModule { }
