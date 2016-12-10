import { Component } from '@angular/core';
import { ArtistService } from '../../shared/service/artist.service';
import { ArtistManager } from '../../shared/manager/artist.manager';
import { Artist } from '../../shared/model/artist';
import { PagedModelResponse } from '../../shared/model/core/paged-model-response';

@Component({
  selector: 'rb-artist-tag-search',
  templateUrl: 'artist-tag-search.component.html'
})
export class ArtistTagSearchComponent {

  text: string;
  rowCount: number;
  artists: Artist[];

  constructor(private artistService: ArtistService, private artistManager: ArtistManager) {
  }

  search(event) {
    this.artistService.getPagedList(event.query, 0, 8)
      .map((res: PagedModelResponse<Artist>) => {
        this.rowCount = res.rowCount;
        this.artists = res.queryList;
      })
      .subscribe();
  }

  onAutocompletSelect(artist: Artist) {
    if (artist != undefined)
      this.artistManager.addToSelection(artist);
  }

  onAutocompletUnselect(artist: Artist) {
    if (artist != undefined)
      this.artistManager.removeFromSelection(artist);
  }
}