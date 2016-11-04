import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AutoCompleteModule } from 'primeng/components/autocomplete/autocomplete';
import { PaginatorModule } from 'primeng/components/paginator/paginator';
import { FileUploadModule } from 'primeng/components/fileupload/fileupload';

import { ArtistWallComponent } from './artist-wall/artist-wall.component';
import { ArtistTagSearchComponent } from './artist-tag-search/artist-tag-search.component';
import { ArtistCreateComponent } from './artist-create/artist-create.component';

@NgModule({
    declarations: [
        ArtistWallComponent,
        ArtistTagSearchComponent,
        ArtistCreateComponent
    ],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, AutoCompleteModule, PaginatorModule, FileUploadModule],
    exports: [ArtistWallComponent, ArtistTagSearchComponent, ArtistCreateComponent]
})
export class ArtistModule { }