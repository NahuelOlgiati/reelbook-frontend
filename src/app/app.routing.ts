import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './shared/service/core/auth.guard';
import { SignupComponent } from './core/auth/signup.component';
import { ErrorPageComponent } from './core/error-page/error-page.component';
import { HomeComponent } from './home/home.component';
import { ProtectedComponent } from './protected/protected.component';
import { ArtistCreateComponent } from './artist/artist-create/artist-create.component';
import { ArtistUpdateComponent } from './artist/artist-update/artist-update.component';
import { UserUpdateComponent } from './user/user-update/user-update.component';
import { YoutubeResponseComponent } from './youtube/youtube-response.component';
import { DriveResponseComponent } from './drive/drive-response.component';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'error-page', component: ErrorPageComponent },
  { path: 'artist-create', component: ArtistCreateComponent, canActivate: [AuthGuard] },
  { path: 'artist-update/:id', component: ArtistUpdateComponent, canActivate: [AuthGuard] },
  { path: 'user-update/:id', component: UserUpdateComponent, canActivate: [AuthGuard] },
  { path: 'youtube-response', component: YoutubeResponseComponent, canActivate: [AuthGuard] },
  { path: 'drive-response', component: DriveResponseComponent, canActivate: [AuthGuard] },
  { path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard] }];

export const AppRouterModule: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);