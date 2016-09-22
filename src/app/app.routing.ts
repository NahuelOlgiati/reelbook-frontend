import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "./core/auth/auth.guard";
import { SignupComponent } from "./core/auth/signup.component";
import { SigninComponent } from "./core/auth/signin.component";
import { ErrorPageComponent } from "./core/error-page/error-page.component";
import { HomeComponent } from "./home/home.component";
import { ProtectedComponent } from "./protected/protected.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard] },
    { path: 'error-page', component: ErrorPageComponent },
];

export const AppRouterModule = RouterModule.forRoot(APP_ROUTES);
