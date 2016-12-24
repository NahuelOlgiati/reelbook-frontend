import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from "@angular/http";
import { SessionManager } from '../manager/core/session.manager';
import { Artist } from '../model/artist';
import { ModelResponse } from '../model/core/model-response';
import { ResponseHeader } from '../model/core/response-header';
import { PagedModelResponse } from '../model/core/paged-model-response';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class ArtistService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http, private sessionManager: SessionManager) { }

  get(modelID: number): Observable<ModelResponse<Artist>> {
    return this.http.get('/rest/artist/get:' + modelID)
      .map((response: Response) => response.json());
  }

  create(artist: Artist): Observable<ModelResponse<Artist>> {
    return this.http.post('/rest/artist', JSON.stringify(artist), this.options)
      .map((response: Response) => {
        if (response.headers.get(ResponseHeader.REFRESH_SESSION_USER)) {
          this.sessionManager.refreshUser();
        }
        return response.json()
      });
  }

  update(artist: Artist): Observable<ModelResponse<Artist>> {
    return this.http.put('/rest/artist', JSON.stringify(artist), this.options)
      .map((response: Response) => response.json());
  }

  delete(artist: Artist): Observable<ModelResponse<Artist>> {
    return this.http.delete('/rest/artist/' + artist.id, this.options)
      .map((response: Response) => response.json());
  }

  getList(): Observable<Artist[]> {
    return this.http.get('/rest/artist')
      .map((response: Response) => response.json())
      .map((res: ModelResponse<Artist[]>) => res.model);
  }

  getPagedList(description: String, firstResult: number, maxResults: number): Observable<PagedModelResponse<Artist>> {
    return this.http.get('/rest/artist/pagedlist:' + description + '?firstResult=' + firstResult + '&maxResults=' + maxResults)
      .map((response: Response) => response.json());
  }

  getPagedlistWithTags(tags: String[], firstResult: number, maxResults: number): Observable<PagedModelResponse<Artist>> {
    var tagsParameter = '';
    for (var _i = 0; _i < tags.length; _i++) {
      var tag = tags[_i];
      tagsParameter = tagsParameter + '&tag=' + tag;
    }
    return this.http.get('/rest/artist/withtags?firstResult=' + firstResult + '&maxResults=' + maxResults + tagsParameter)
      .map((response: Response) => response.json());
  }
}