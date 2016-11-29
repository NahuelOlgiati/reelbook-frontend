import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AutoCompleteModule } from 'primeng/components/autocomplete/autocomplete';
import { PaginatorModule } from 'primeng/components/paginator/paginator';
import { FileUploadModule } from 'primeng/components/fileupload/fileupload';
import { ImageCropperModule } from 'ng2-img-cropper';

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
    imports: [CommonModule, FormsModule, ReactiveFormsModule, ImageCropperModule, AutoCompleteModule, PaginatorModule, FileUploadModule],
    exports: [ArtistWallComponent, ImgCropper, ArtistTagSearchComponent, ArtistCreateComponent]
})
export class ArtistModule { }