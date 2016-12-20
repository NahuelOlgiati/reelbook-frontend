import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AutoCompleteModule } from 'primeng/components/autocomplete/autocomplete';
import { PaginatorModule } from 'primeng/components/paginator/paginator';
import { ImageCropperModule } from 'ng2-img-cropper';
import { RbPrimengModule } from '../third-party/primeng/primeng.module';

import { ArtistWallComponent } from './artist-wall/artist-wall.component';
import { ImgCropper } from './artist-create/img-cropper.component';
import { ArtistTagSearchComponent } from './artist-tag-search/artist-tag-search.component';
import { ArtistCreateComponent } from './artist-create/artist-create.component';

@NgModule({
    declarations: [
        ArtistWallComponent,
        ImgCropper,
        ArtistTagSearchComponent,
        ArtistCreateComponent
    ],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, ImageCropperModule, AutoCompleteModule, PaginatorModule, RbPrimengModule],
    exports: [ArtistWallComponent, ImgCropper, ArtistTagSearchComponent, ArtistCreateComponent]
})
export class ArtistModule { }