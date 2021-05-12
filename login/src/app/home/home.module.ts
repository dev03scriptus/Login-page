import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SearchComponent } from '../search/search.component'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe'
@NgModule({
  declarations: [
    HomeComponent,
    SearchComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
    
  ]
})
export class HomeModule {  }
