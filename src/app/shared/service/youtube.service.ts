import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

declare var jQuery: any;

@Injectable()
export class YoutubeService {

  constructor(private http: Http) { }

  getUserVideos(): Observable<M.PagedModelResponse<M.YoutubeVideo>> {
    return this.http.get('/rest/youtube/userVideos')
      .map((response: Response) => response.json());
  }
}