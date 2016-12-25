import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from "@angular/http";
import { User } from '../../shared/model/user';
import { ModelResponse } from '../../shared/model/core/model-response';
import { PagedModelResponse } from '../../shared/model/core/paged-model-response';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http) { }

    get(modelID: number): Observable<ModelResponse<User>> {
        return this.http.get('/rest/user/get:' + modelID)
            .map((response: Response) => response.json());
    }

    create(user: User): Observable<ModelResponse<User>> {
        return this.http.post('/rest/user', JSON.stringify(user), this.options)
            .map((response: Response) => response.json());
    }

    update(user: User): Observable<ModelResponse<User>> {
        return this.http.put('/rest/user', JSON.stringify(user), this.options)
            .map((response: Response) => response.json());
    }

    delete(user: User): Observable<ModelResponse<User>> {
        return this.http.delete('/rest/user/' + user.id, this.options)
            .map((response: Response) => response.json());
    }

    getList(): Observable<User[]> {
        return this.http.get('/rest/user')
            .map((response: Response) => response.json())
            .map((res: ModelResponse<User[]>) => res.model);
    }

    getPagedList(description: String, firstResult: number, maxResults: number): Observable<PagedModelResponse<User>> {
        return this.http.get('/rest/user/pagedlist:' + description + '?firstResult=' + firstResult + '&maxResults=' + maxResults)
            .map((response: Response) => response.json());
    }
}