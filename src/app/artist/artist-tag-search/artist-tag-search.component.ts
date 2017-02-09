import { Component } from '@angular/core';
import { ArtistWallManager } from '../artist-wall/artist-wall.manager';
import { Artist } from '../../shared/model/artist';
import { PagedModelResponse } from '../../shared/model/core/paged-model-response';

@Component({
  selector: 'rb-artist-tag-search',
  templateUrl: './artist-tag-search.component.html'
})
export class ArtistTagSearchComponent {

  selection: Artist[];
  artists: Artist[];

  constructor(private artistWallManager: ArtistWallManager) {
  }

  search(event) {
    this.artistWallManager.getPagedList(event.query, 0, 8)
      .map((res: PagedModelResponse<Artist>) => {
        this.artists = res.queryList;
      })
      .subscribe();
  }

  tagFilter() {
    if (this.selection) {
      const artistDescriptions: String[] = [];
      for (let _i = 0; _i < this.selection.length; _i++) {
        const artist = this.selection[_i];
        artistDescriptions.push(artist.description);
      }
      this.artistWallManager.getPagedlistWithTags(artistDescriptions, 0, 8)
        .map((res: PagedModelResponse<Artist>) => {
          this.artists = res.queryList;
          this.artistWallManager.setList(this.artists);
          this.artistWallManager.setRowCount(res.rowCount);
          this.artistWallManager.artistsChanged.emit(true);
        })
        .subscribe();
    }
  }
}