import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

declare var jQuery: any;

@Injectable()
export class YoutubeService {

  // https://console.cloud.google.com/apis/credentials
  private API_GOOGLE_CLIENT_ID = '822657132611-le5ivjjco3upqr3hbqstestj6q2ip2fs.apps.googleusercontent.com';
  private API_GOOGLE_CLIENT_SECRET = 'Q2osaQv70mZZpo5hFgL3wU1z';

  private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getReadOnlyPermitUrl(redirect_uri: String): String {
    const data = {
      'client_id': this.API_GOOGLE_CLIENT_ID,
      'scope': 'https://www.googleapis.com/auth/youtube.readonly',
      'approval_prompt': 'force',
      'response_type': 'code',
      'access_type': 'offline',
      'redirect_uri': redirect_uri
    };
    const param = jQuery.param(data);
    return 'https://accounts.google.com/o/oauth2/auth?' + param;
  }

  getAccessToken(code: String, redirect_uri: String): Observable<any> {
    return Observable.create(observer => {
      const body = {
        'code': code,
        'redirect_uri': redirect_uri,
        'client_id': this.API_GOOGLE_CLIENT_ID,
        'client_secret': this.API_GOOGLE_CLIENT_SECRET,
        'grant_type': 'authorization_code'
      };
      const param = jQuery.param(body);
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://accounts.google.com/o/oauth2/token', true);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            observer.next(JSON.parse(xhr.response));
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };

      xhr.send(param);
    });
  }

  saveCredential(accessToken: String, refreshToken: String): Observable<M.YoutubeCredential> {
    const body = 'accessToken=' + accessToken + '&refreshToken=' + refreshToken;
    return this.http.post('/rest/youtube/credential/save', body, this.options)
      .map((response: Response) => response.json())
      .map((res: M.ModelResponse<M.YoutubeCredential>) => res.model);
  }

  getUserVideos(): Observable<M.PagedModelResponse<M.YoutubeVideo>> {
    return this.http.get('/rest/youtube/userVideos')
      .map((response: Response) => response.json());
  }
}