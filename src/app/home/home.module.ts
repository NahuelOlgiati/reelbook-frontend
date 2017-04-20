import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { BannerComponent } from './banner/banner.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    ContactComponent
  ],
  imports: [CommonModule, RouterModule]
})
export class HomeModule { }
