import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

declare var jQuery: any;

@Injectable()
export class DriveService {

  constructor(private http: Http) { }

  getUserVideos(): Observable<M.PagedModelResponse<M.DriveFile>> {
    return this.http.get('/rest/drive/userFiles')
      .map((response: Response) => response.json());
  }
}