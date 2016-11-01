import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Artist } from '../../shared/model/artist';
import { PagedModelResponse } from '../../shared/model/paged-model-response';
import { ArtistService } from '../artist.service';
import { ArtistManager } from '../artist.manager';
import { GrowlMessageService } from '../../service/growl-message.service';

@Component({
  selector: 'rb-artist-wall',
  templateUrl: 'artist-wall.component.html',
  styleUrls: ['./artist-wall.component.scss']
})
export class ArtistWallComponent implements OnInit {

  artists: Artist[];
  artistsSelection: number[] = [];
  deploySelection: boolean = false;
  rowCount: number = 0;

  constructor(private artistService: ArtistService, private artistManager: ArtistManager) { }

  ngOnInit() {
    this.artistManager.artistsChanged.subscribe((artists: Artist[]) => {
      this.artists = artists;
    });
    this.artistManager.artistsSelectionChanged.subscribe((selection: number[]) => {
      this.artistsSelection = selection;
    });
    this.artistService.getPagedList(' ', 0, 8)
      .map((res: PagedModelResponse<Artist>) => {
        this.rowCount = res.rowCount;
        this.artistManager.setList(res.queryList);
        this.artistManager.artistsChanged.emit(res.queryList);
      })
      .subscribe();
  }

  onSelect(artist: Artist) {
    if (this.isActive(artist)) {
      this.artistManager.removeFromSelection(artist);
    } else {
      this.artistManager.addToSelection(artist);
    }
  }

  isActive(artist: Artist): Boolean {
    return this.artistManager.isOnSelection(artist);
  }

  getModelSelection(): Artist[] {
    return this.artistManager.getModelSelection();
  }
}