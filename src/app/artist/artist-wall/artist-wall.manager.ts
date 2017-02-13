import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { ArtistService } from '../../shared/service/artist.service';

@Injectable()
export class ArtistWallManager {

  private artists: M.Artist[];
  private rowCount: Number = 0;
  public artistsChanged = new EventEmitter<Boolean>();

  private artistsSelection: Number[] = [];
  public artistsSelectionChanged = new EventEmitter<Number[]>();

  constructor(private artistService: ArtistService) { }

  fetch(description: String, firstResult: Number, maxResults: Number): Observable<void> {
    return this.artistService.getPagedList(description, firstResult, maxResults)
      .map((res: M.PagedModelResponse<M.Artist>) => {
        this.rowCount = res.rowCount;
        this.artists = res.queryList;
        this.artistsChanged.emit(true);
      });
  }

  getPagedList(description: String, firstResult: number, maxResults: number): Observable<M.PagedModelResponse<M.Artist>> {
    return this.artistService.getPagedList(description, firstResult, maxResults);
  }

  getPagedlistWithTags(tags: String[], firstResult: number, maxResults: number): Observable<M.PagedModelResponse<M.Artist>> {
    return this.artistService.getPagedlistWithTags(tags, firstResult, maxResults);
  }

  removeFromSelection(artist: M.Artist) {
    this.artistsSelection.splice(this.artistsSelection.indexOf(artist.id), 1);
    this.artistsSelectionChanged.emit(this.artistsSelection);
  }

  addToSelection(artist: M.Artist) {
    this.artistsSelection.push(artist.id);
    this.artistsSelectionChanged.emit(this.artistsSelection);
  }

  isOnSelection(artist: M.Artist): Boolean {
    return this.artistsSelection.indexOf(artist.id) >= 0;
  }

  getList(): M.Artist[] {
    return this.artists;
  }

  setList(list: M.Artist[]): void {
    this.artists = list;
  }

  getRowCount(): Number {
    return this.rowCount;
  }

  setRowCount(rowCount: Number): void {
    this.rowCount = rowCount;
  }

  getSelection(): M.Artist[] {
    if (this.artists)
      return this.artists.filter((value: M.Artist, index: number, array: M.Artist[]) => (this.artistsSelection.indexOf(value.id) >= 0));
  }

  getModelSelection(): M.Artist[] {
    if (this.artists)
      return this.artists.filter(
        (value: M.Artist, index: number, array: M.Artist[]) => (this.artistsSelection.indexOf(value.id) >= 0));
  }
}