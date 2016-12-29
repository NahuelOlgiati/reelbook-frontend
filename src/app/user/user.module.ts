import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AudiovisualModule } from '../audiovisual/audiovisual.module';

import { UserUpdateComponent } from './user-update/user-update.component';

@NgModule({
    declarations: [UserUpdateComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, AudiovisualModule],
    exports: [UserUpdateComponent]
})
export class UserModule { }