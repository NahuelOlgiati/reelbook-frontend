import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AutoCompleteModule } from 'primeng/components/autocomplete/autocomplete';
import { PaginatorModule } from 'primeng/components/paginator/paginator';
import { ProfileImageModule } from '../shared/component/profile-image.component';

import { RbBlockUIModule } from '../third-party/primeng/blockui.component';
import { RbFileUploadModule } from '../third-party/primeng/fileupload.component';

import { ArtistWallComponent } from './artist-wall/artist-wall.component';
import { ArtistTagSearchComponent } from './artist-tag-search/artist-tag-search.component';
import { ArtistCreateComponent } from './artist-create/artist-create.component';
import { ArtistUpdateComponent } from './artist-update/artist-update.component';

@NgModule({
  declarations: [
    ArtistWallComponent,
    ArtistTagSearchComponent,
    ArtistCreateComponent,
    ArtistUpdateComponent
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RbBlockUIModule, RbFileUploadModule, ProfileImageModule, AutoCompleteModule, PaginatorModule],
  exports: [ArtistWallComponent, ArtistTagSearchComponent, ArtistCreateComponent, ArtistUpdateComponent]
})
export class ArtistModule { }