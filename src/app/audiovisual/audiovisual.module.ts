import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RbFileUploadModule } from '../third-party/primeng/fileupload.component';

import { UserAudiovisualUpdateComponent } from './audiovisual-update/audiovisual-update.component';

@NgModule({
  declarations: [UserAudiovisualUpdateComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RbFileUploadModule],
  exports: [UserAudiovisualUpdateComponent]
})
export class AudiovisualModule { }