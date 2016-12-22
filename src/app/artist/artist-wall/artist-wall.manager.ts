import { Injectable, EventEmitter } from '@angular/core';
import { Artist } from '../../shared/model/artist';
import { ModelResponse } from '../../shared/model/core/model-response';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { ArtistService } from '../../shared/service/artist.service';
import { PagedModelResponse } from '../../shared/model/core/paged-model-response';

@Injectable()
export class ArtistWallManager {

    private artists: Artist[];
    private rowCount: number = 0;
    public artistsChanged = new EventEmitter<Boolean>();

    private artistsSelection: number[] = [];
    public artistsSelectionChanged = new EventEmitter<number[]>();

    constructor(private artistService: ArtistService) { }

    fetch(description: String, firstResult: number, maxResults: number): Observable<void> {
        return this.artistService.getPagedList(description, firstResult, maxResults)
            .map((res: PagedModelResponse<Artist>) => {
                this.rowCount = res.rowCount;
                this.artists = res.queryList;
                this.artistsChanged.emit(true);
            });
    }

    getPagedList(description: String, firstResult: number, maxResults: number): Observable<PagedModelResponse<Artist>> {
        return this.artistService.getPagedList(description, firstResult, maxResults);
    }

    getPagedlistWithTags(tags: String[], firstResult: number, maxResults: number): Observable<PagedModelResponse<Artist>> {
        return this.artistService.getPagedlistWithTags(tags, firstResult, maxResults);
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

    getRowCount(): number {
        return this.rowCount;
    }

    setRowCount(rowCount: number): void {
        this.rowCount = rowCount;
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