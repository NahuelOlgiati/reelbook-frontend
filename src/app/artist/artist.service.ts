import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response, RequestOptions} from "@angular/http";
import { Artist } from '../shared/model/artist';
import { ModelResponse } from '../shared/model/model-response';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class ArtistService {

  private BASE_URL = 'http://localhost:8080/rest/';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  private artists: Artist[] = [];
  public artistsChanged = new EventEmitter<Artist[]>();

  constructor(private http: Http) { }

  getArtists(): Artist[] {
    return this.artists;
  }

  fetchData() {
    return this.http.get(this.BASE_URL + 'artist')
      .map((response: Response) => response.json())
      .subscribe((data: Artist[]) => {
        this.artists = data;
        this.artistsChanged.emit(this.artists);
      }
      );
  }

  autocomplete(description: String): Observable<Artist> {
    return this.http.get(this.BASE_URL + 'artist/autocomplete:' + description + '?firstResult=0&maxResults=8')
      .map((response: Response) => response.json())
      .map((response: ModelResponse<Artist>) => response.model);
  }

  createDocumentType(artist: Artist): Observable<void> {
    return this.http.post(this.BASE_URL + 'artist', JSON.stringify(artist), this.options)
      .map((response: Response) => response.json())
      .map((res: ModelResponse<Artist>) => {
        this.artists.push(res.model);
        this.artistsChanged.emit(this.artists);
      }
      );
  }

  editDocumentType(artist: Artist): Observable<void> {
    return this.http.put(this.BASE_URL + 'artist', JSON.stringify(artist), this.options)
      .map((response: Response) => response.json())
      .map((res: ModelResponse<Artist>) => {
        this.artists = this.artists.filter((t, n, arr) => t.id !== res.model.id);
        this.artists.push(res.model);
        this.artistsChanged.emit(this.artists);
      }
      );
  }

  removeDocumentType(artist: Artist): Observable<void> {
    return this.http.delete(this.BASE_URL + 'artist/' + artist.id, this.options)
      .map((response: Response) => response.json())
      .map((res: ModelResponse<Artist>) => {
        this.artists = this.artists.filter((t, n, arr) => t.id !== res.model.id);
        this.artistsChanged.emit(this.artists);
      }
      );
  }

}