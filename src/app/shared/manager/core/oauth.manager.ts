import { Injectable } from '@angular/core';

declare var jQuery: any;

@Injectable()
export class OauthManager {

  // https://console.cloud.google.com/apis/credentials
  private API_GOOGLE_CLIENT_ID = '822657132611-le5ivjjco3upqr3hbqstestj6q2ip2fs.apps.googleusercontent.com';

  public youtubeReadOnlyPermitUrl: String;
  public driveReadOnlyPermitUrl: String;

  constructor() { }

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
}
