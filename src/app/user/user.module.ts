import { ArtistCreateComponent } from '../artist/artist-create/artist-create.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AudiovisualModule } from '../audiovisual/audiovisual.module';

import { RbFileUploadModule } from '../third-party/primeng/fileupload.component';
import { ProfileImageModule } from '../third-party/img-cropper/profile-image.component';

import { UserUpdateComponent } from './user-update/user-update.component';
import { OauthBarComponent } from '../oauth/oauth-bar.component';
import { RouterModule } from '@angular/router';
import { SubMenuComponent } from '../layout/submenu.component';
// TODO

@NgModule({
  declarations: [UserUpdateComponent, OauthBarComponent, ArtistCreateComponent, SubMenuComponent],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, AudiovisualModule, RbFileUploadModule, ProfileImageModule],
  exports: [UserUpdateComponent]
})
export class UserModule { }
