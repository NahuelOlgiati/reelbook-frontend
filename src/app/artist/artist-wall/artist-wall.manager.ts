import { Artist, PagedModelResponse, ArtistService } from '../../app.backend';
import { Injectable, EventEmitter } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class ArtistWallManager {

  private artists: Artist[];
  private rowCount: Number = 0;
  public artistsChanged = new EventEmitter<Boolean>();

  private artistsSelection: Number[] = [];
  public artistsSelectionChanged = new EventEmitter<Number[]>();

  constructor(private artistService: ArtistService) { }

  fetch(description: string, firstResult: number, maxResults: number): Observable<void> {
    return this.artistService.pagedlist(description, {'firstResult':firstResult, 'maxResults':maxResults})
      .map((response: Response) => response.json())
      .map((res: PagedModelResponse<Artist>) => {
        this.rowCount = res.rowCount;
        this.artists = res.queryList;
        this.artistsChanged.emit(true);
      });
  }

  getPagedList(description: string, firstResult: number, maxResults: number): Observable<PagedModelResponse<Artist>> {
    return this.artistService.pagedlist(description, {'firstResult':firstResult, 'maxResults':maxResults});
  }

  // TODO
  getPagedlistWithTags(tags: String[], firstResult: number, maxResults: number): Observable<PagedModelResponse<Artist>> {
    let tagsParameter = '';
    for (let _i = 0; _i < tags.length; _i++) {
      const tag = tags[_i];
      tagsParameter = tagsParameter + '&tag=' + tag;
    }
    return this.artistService.pagedlist(tagsParameter, {'firstResult':firstResult, 'maxResults':maxResults});
  }

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

  getRowCount(): Number {
    return this.rowCount;
  }

  setRowCount(rowCount: Number): void {
    this.rowCount = rowCount;
  }

  getSelection(): Artist[] {
    if (this.artists)
      return this.artists.filter((value: Artist, index: number, array: Artist[]) => (this.artistsSelection.indexOf(value.id) >= 0));
  }

  getModelSelection(): Artist[] {
    if (this.artists)
      return this.artists.filter(
        (value: Artist, index: number, array: Artist[]) => (this.artistsSelection.indexOf(value.id) >= 0));
  }
}