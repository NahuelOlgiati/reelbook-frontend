import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { AudioVisual } from '../../shared/model/audiovisual';
import { ModelResponse } from '../../shared/model/core/model-response';
import { PagedModelResponse } from '../../shared/model/core/paged-model-response';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class AudioVisualService {

    private headers = new Headers({ '-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http) { }

    get(modelID: number): Observable<ModelResponse<AudioVisual>> {
        return this.http.get('/rest/audiovisual/get:' + modelID)
            .map((response: Response) => response.json());
    }

    create(AudioVisual: AudioVisual): Observable<ModelResponse<AudioVisual>> {
        return this.http.post('/rest/audiovisual', JSON.stringify(AudioVisual), this.options)
            .map((response: Response) => response.json());
    }

    update(AudioVisual: AudioVisual): Observable<ModelResponse<AudioVisual>> {
        return this.http.put('/rest/audiovisual', JSON.stringify(AudioVisual), this.options)
            .map((response: Response) => response.json());
    }

    delete(AudioVisual: AudioVisual): Observable<ModelResponse<AudioVisual>> {
        return this.http.delete('/rest/audiovisual/' + AudioVisual.id, this.options)
            .map((response: Response) => response.json());
    }

    getList(): Observable<AudioVisual[]> {
        return this.http.get('/rest/audiovisual')
            .map((response: Response) => response.json())
            .map((res: ModelResponse<AudioVisual[]>) => res.model);
    }

    getPagedList(description: String, firstResult: number, maxResults: number): Observable<PagedModelResponse<AudioVisual>> {
        return this.http.get('/rest/audiovisual/pagedlist:' + description + '?firstResult=' + firstResult + '&maxResults=' + maxResults)
            .map((response: Response) => response.json());
    }
}