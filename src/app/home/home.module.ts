import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { BannerComponent } from './banner/banner.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    ContactComponent
  ],
  imports: [CommonModule]
})
export class HomeModule { }