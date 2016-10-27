import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response, RequestOptions} from "@angular/http";
import { Artist } from '../shared/model/artist';
import { ModelResponse } from '../shared/model/model-response';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class ArtistManager {

  private artists: Artist[];
  public artistsChanged = new EventEmitter<Artist[]>();

  private artistsSelection: number[] = [];
  public artistsSelectionChanged = new EventEmitter<number[]>();

  constructor() { }

  removeFromSelection(artist: Artist) {
    this.artistsSelection.splice(this.artistsSelection.indexOf(artist.id), 1);
    this.artistsSelectionChanged.emit(this.artistsSelection);
  }

  addToSelection(artist: Artist) {
    this.artistsSelection.push(artist.id);
    this.artistsSelectionChanged.emit(this.artistsSelection);
  }

  isOnSelection(artist: Artist): Boolean {
    return this.artistsSelection.indexOf(artist.id) >= 0;
  }

  getList(): Artist[] {
    return this.artists;
  }

  setList(list: Artist[]): void {
    this.artists = list;
  }

  getSelection(): Artist[] {
    if (this.artists != undefined)
      return this.artists.filter((value: Artist, index: number, array: Artist[]) => (this.artistsSelection.indexOf(value.id) >= 0));
  }

  getModelSelection(): Artist[] {
    if (this.artists != undefined)
      return this.artists.filter(
        (value: Artist, index: number, array: Artist[]) => (this.artistsSelection.indexOf(value.id) >= 0));
  }
}