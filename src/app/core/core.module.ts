import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalModule } from './modal/modal.module';
import { GrowlModule } from 'primeng/components/growl/growl';

import { SigninComponent } from "./auth/signin.component";
import { FacebookSigninComponent } from "./auth/facebook-signin.component";
import { SignupComponent } from "./auth/signup.component";
import { LogoutComponent } from "./auth/logout.component";
import { ErrorPageComponent } from "./error-page/error-page.component";

@NgModule({
    declarations: [
        SigninComponent,
        FacebookSigninComponent,
        SignupComponent,
        LogoutComponent,
        ErrorPageComponent
    ],
    imports: [CommonModule, HttpModule, FormsModule, ReactiveFormsModule, ModalModule, GrowlModule],
    exports: [LogoutComponent, ModalModule, SigninComponent]
})
export class CoreModule { }