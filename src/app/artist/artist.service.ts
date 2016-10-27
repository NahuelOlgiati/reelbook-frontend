import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions} from "@angular/http";
import { Artist } from '../shared/model/artist';
import { ModelResponse } from '../shared/model/model-response';
import { PagedModelResponse } from '../shared/model/paged-model-response';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class ArtistService {

  private BASE_URL = 'http://localhost:8080/rest';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  get(modelID: number): Observable<Artist> {
    return this.http.get(this.BASE_URL + '/artist/get:' + modelID)
      .map((response: Response) => response.json());
  }

  getList(): Observable<Artist[]> {
    return this.http.get(this.BASE_URL + '/artist')
      .map((response: Response) => response.json())
      .map((res: ModelResponse<Artist[]>) => res.model);
  }

  getPagedList(description: String, firstResult: number, maxResults: number): Observable<PagedModelResponse<Artist>> {
    return this.http.get(this.BASE_URL + '/artist/pagedlist:' + description + '?firstResult=' + firstResult + '&maxResults=' + maxResults)
      .map((response: Response) => response.json());
  }

  create(artist: Artist): Observable<Artist> {
    return this.http.post(this.BASE_URL + '/artist', JSON.stringify(artist), this.options)
      .map((response: Response) => response.json())
      .map((res: ModelResponse<Artist>) => res.model);
  }

  update(artist: Artist): Observable<Artist> {
    return this.http.put(this.BASE_URL + '/artist', JSON.stringify(artist), this.options)
      .map((response: Response) => response.json())
      .map((res: ModelResponse<Artist>) => res.model);
  }

  delete(artist: Artist): Observable<Artist> {
    return this.http.delete(this.BASE_URL + '/artist/' + artist.id, this.options)
      .map((response: Response) => response.json())
      .map((res: ModelResponse<Artist>) => res.model);
  }

}