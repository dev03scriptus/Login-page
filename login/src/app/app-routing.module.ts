import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './auth.guard';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { ServicesComponent } from './services/services.component';
import { UnauthGuard } from './unauth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch : 'full',
  },
  { 
    path: 'login',
    component: LoginComponent,
    canActivate: [UnauthGuard]
  },
  { 
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'contact',
    component: ContactComponent,
    loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'about',
    component: AboutComponent,
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'services',
    component: ServicesComponent,
    loadChildren: () => import('./services/services.module').then(m => m.ServicesModule),
    canActivate: [AuthGuard]

  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
