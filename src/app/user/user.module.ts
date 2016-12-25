import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserUpdateComponent } from './user-update/user-update.component';

@NgModule({
    declarations: [UserUpdateComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    exports: [UserUpdateComponent]
})
export class UserModule { }