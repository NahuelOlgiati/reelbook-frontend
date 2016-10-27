import { Component, Output, EventEmitter } from '@angular/core';
import { ArtistService } from '../artist.service';
import { Artist } from '../../shared/model/artist';

@Component({
  selector: 'rb-artist-tag-search',
  templateUrl: 'artist-tag-search.component.html'
})
export class ArtistTagSearchComponent {

  text: string;
  artists: Artist[];
  @Output() autocompleteSelected = new EventEmitter<Artist[]>();

  constructor(private artistService: ArtistService) {
  }

  search(event) {
    this.artistService.autocomplete(event.query).map(
      (res: any) => {
        this.artists = res.queryList;
        this.autocompleteSelected.emit(this.artists);
      }).subscribe();
  }
}