import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { SessionManager } from '../manager/core/session.manager';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class ArtistService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http, private sessionManager: SessionManager) { }

  get(modelID: Number): Observable<M.ModelResponse<M.Artist>> {
    return this.http.get('/rest/artist/get:' + modelID)
      .map((response: Response) => response.json());
  }

  create(artist: M.Artist): Observable<M.ModelResponse<M.Artist>> {
    return this.http.post('/rest/artist', JSON.stringify(artist), this.options)
      .map((response: Response) => {
        if (response.headers.get('REFRESH_SESSION_USER')) {// M.ResponseHeaderEnum
          this.sessionManager.refreshUser();
        }
        return response.json();
      });
  }

  update(artist: M.Artist): Observable<M.ModelResponse<M.Artist>> {
    return this.http.put('/rest/artist', JSON.stringify(artist), this.options)
      .map((response: Response) => response.json());
  }

  delete(artist: M.Artist): Observable<M.ModelResponse<M.Artist>> {
    return this.http.delete('/rest/artist/' + artist.id, this.options)
      .map((response: Response) => response.json());
  }

  getList(): Observable<M.Artist[]> {
    return this.http.get('/rest/artist')
      .map((response: Response) => response.json())
      .map((res: M.ModelResponse<M.Artist[]>) => res.model);
  }

  getPagedList(description: String, firstResult: Number, maxResults: Number): Observable<M.PagedModelResponse<M.Artist>> {
    return this.http.get('/rest/artist/pagedlist:' + description + '?firstResult=' + firstResult + '&maxResults=' + maxResults)
      .map((response: Response) => response.json());
  }

  getPagedlistWithTags(tags: String[], firstResult: Number, maxResults: Number): Observable<M.PagedModelResponse<M.Artist>> {
    let tagsParameter = '';
    for (let _i = 0; _i < tags.length; _i++) {
      const tag = tags[_i];
      tagsParameter = tagsParameter + '&tag=' + tag;
    }
    return this.http.get('/rest/artist/withtags?firstResult=' + firstResult + '&maxResults=' + maxResults + tagsParameter)
      .map((response: Response) => response.json());
  }
}