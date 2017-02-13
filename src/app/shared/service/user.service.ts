import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  get(modelID: number): Observable<M.ModelResponse<M.User>> {
    return this.http.get('/rest/user/get:' + modelID)
      .map((response: Response) => response.json());
  }

  create(user: M.User): Observable<M.ModelResponse<M.User>> {
    return this.http.post('/rest/user', JSON.stringify(user), this.options)
      .map((response: Response) => response.json());
  }

  update(user: M.User): Observable<M.ModelResponse<M.User>> {
    return this.http.put('/rest/user', JSON.stringify(user), this.options)
      .map((response: Response) => response.json());
  }

  delete(user: M.User): Observable<M.ModelResponse<M.User>> {
    return this.http.delete('/rest/user/' + user.id, this.options)
      .map((response: Response) => response.json());
  }

  getList(): Observable<M.User[]> {
    return this.http.get('/rest/user')
      .map((response: Response) => response.json())
      .map((res: M.ModelResponse<M.User[]>) => res.model);
  }

  getPagedList(description: String, firstResult: number, maxResults: number): Observable<M.PagedModelResponse<M.User>> {
    return this.http.get('/rest/user/pagedlist:' + description + '?firstResult=' + firstResult + '&maxResults=' + maxResults)
      .map((response: Response) => response.json());
  }

  stream(): Observable<any> {
    return this.http.get('/rest/user/stream');
  }
}