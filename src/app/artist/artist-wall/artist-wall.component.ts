import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Artist } from '../../shared/model/artist';
import { ArtistService } from '../artist.service';
import { GrowlMessageService } from '../../service/growl-message.service';

@Component({
  selector: 'rb-artist-wall',
  templateUrl: 'artist-wall.component.html',
  styleUrls: ['./artist-wall.component.scss']
})
export class ArtistWallComponent implements OnInit {

  artists: Artist[];
  selectedArtists: number[] = [];

  deploySelection: boolean = false;

  constructor(private artistService: ArtistService) { }

  ngOnInit() {
    this.artistService.fetchData();
    this.artistService.artistsChanged.subscribe(
      (artists: Artist[]) => this.artists = artists
    );
  }

  onActive(artist: Artist) {
    if (this.isActive(artist)) {
      this.selectedArtists.splice(this.selectedArtists.indexOf(artist.id), 1);
    } else {
      this.selectedArtists.push(artist.id);
    }
  }

  isActive(artist: Artist): Boolean {
    return this.selectedArtists.indexOf(artist.id) >= 0;
  }

  getSelectedModels(): Artist[] {
    if (this.artists != undefined)
      return this.artists.filter(
        (value: Artist, index: number, array: Artist[]) => (this.selectedArtists.indexOf(value.id) >= 0));
  }

  onAutocompletFilter(artists: Artist[]) {
    console.log(this.selectedArtists);

    if (artists != undefined)
      artists.forEach(ace => {
        let existIn = false;
        this.selectedArtists.forEach(se => {
          if (ace.id == se) existIn = true;
        });

        if (!existIn)
          this.selectedArtists.push(ace.id);
      });

    console.log(this.selectedArtists);
  }

}