import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AudiovisualModule } from '../audiovisual/audiovisual.module';

import { RbBlockUIModule } from '../third-party/primeng/blockui.component';
import { RbFileUploadModule } from '../third-party/primeng/fileupload.component';

import { UserUpdateComponent } from './user-update/user-update.component';

@NgModule({
    declarations: [UserUpdateComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, AudiovisualModule, RbBlockUIModule, RbFileUploadModule],
    exports: [UserUpdateComponent]
})
export class UserModule { }