import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "./shared/service/core/auth.guard";
import { SignupComponent } from "./core/auth/signup.component";
import { ErrorPageComponent } from "./core/error-page/error-page.component";
import { HomeComponent } from "./home/home.component";
import { ProtectedComponent } from "./protected/protected.component";
import { ArtistCreateComponent } from "./artist/artist-create/artist-create.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'error-page', component: ErrorPageComponent },
    { path: 'artist-create', component: ArtistCreateComponent, canActivate: [AuthGuard] },
    { path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard] }];

export const AppRouterModule = RouterModule.forRoot(APP_ROUTES);