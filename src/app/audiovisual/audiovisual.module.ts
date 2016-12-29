import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserAudiovisualUpdateComponent } from './audiovisual-update/audiovisual-update.component';

@NgModule({
    declarations: [UserAudiovisualUpdateComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    exports: [UserAudiovisualUpdateComponent]
})
export class AudiovisualModule { }