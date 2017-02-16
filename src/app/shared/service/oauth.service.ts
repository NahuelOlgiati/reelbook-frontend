import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

declare var jQuery: any;

@Injectable()
export class OauthService {

  // https://console.cloud.google.com/apis/credentials
  private API_GOOGLE_CLIENT_ID = '822657132611-le5ivjjco3upqr3hbqstestj6q2ip2fs.apps.googleusercontent.com';

  private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getYoutubeReadOnlyPermitUrl(redirectUri: String): String {
    const data = {
      'client_id': this.API_GOOGLE_CLIENT_ID,
      'scope': 'https://www.googleapis.com/auth/youtube.readonly',
      'approval_prompt': 'force',
      'response_type': 'code',
      'access_type': 'offline',
      'redirect_uri': redirectUri + '?credential=youtube'
    };
    const param = jQuery.param(data);
    return 'https://accounts.google.com/o/oauth2/auth?' + param;
  }

  hasYoutubeCredential(): Observable<M.ModelResponse<Boolean>> {
    return this.http.get('/rest/oauth/credential/youtube/has')
      .map((response: Response) => response.json());
  }

  saveYoutubeCredential(authCode: String, redirectUri: String): Observable<M.ModelResponse<Boolean>> {
    const body = 'authCode=' + authCode + '&redirectUri=' + redirectUri + '?credential=youtube';
    return this.http.post('/rest/oauth/credential/youtube/save', body, this.options)
      .map((response: Response) => response.json());
  }

  getDriveReadOnlyPermitUrl(redirectUri: String): String {
    const data = {
      'client_id': this.API_GOOGLE_CLIENT_ID,
      'scope': 'https://www.googleapis.com/auth/drive.readonly',
      'approval_prompt': 'force',
      'response_type': 'code',
      'access_type': 'offline',
      'redirect_uri': redirectUri + '?credential=drive'
    };
    const param = jQuery.param(data);
    return 'https://accounts.google.com/o/oauth2/auth?' + param;
  }

  hasDriveCredential(): Observable<M.ModelResponse<Boolean>> {
    return this.http.get('/rest/oauth/credential/drive/has')
      .map((response: Response) => response.json());
  }

  saveDriveCredential(authCode: String, redirectUri: String): Observable<M.ModelResponse<Boolean>> {
    const body = 'authCode=' + authCode + '&redirectUri=' + redirectUri + '?credential=drive';
    return this.http.post('/rest/oauth/credential/drive/save', body, this.options)
      .map((response: Response) => response.json());
  }
}