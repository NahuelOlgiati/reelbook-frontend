import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AutoCompleteModule } from 'primeng/components/autocomplete/autocomplete';

import { ArtistWallComponent } from './artist-wall/artist-wall.component';
import { ArtistTagSearchComponent } from './artist-tag-search/artist-tag-search.component';

@NgModule({
    declarations: [
        ArtistWallComponent,
        ArtistTagSearchComponent
    ],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, AutoCompleteModule],
    exports: [ArtistWallComponent, ArtistTagSearchComponent]
})
export class ArtistModule { }