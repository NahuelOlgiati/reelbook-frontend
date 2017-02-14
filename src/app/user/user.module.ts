import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AudiovisualModule } from '../audiovisual/audiovisual.module';

import { RbFileUploadModule } from '../third-party/primeng/fileupload.component';

import { UserUpdateComponent } from './user-update/user-update.component';
import { OauthBarComponent } from '../oauth/oauth-bar.component';

@NgModule({
  declarations: [UserUpdateComponent, OauthBarComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AudiovisualModule, RbFileUploadModule],
  exports: [UserUpdateComponent]
})
export class UserModule { }