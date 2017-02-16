import { Component, OnInit } from '@angular/core';
import { OauthService } from '../shared/service/oauth.service';

@Component({
  selector: 'rb-youtube-readonly',
  template: `
              <a [href]="readOnlyPermitUrl">
                  <div>Youtube Read Only Permssion</div>
              </a>
            `
})
export class YoutubeReadOnlyComponent implements OnInit {

  public readOnlyPermitUrl: String;

  constructor(private oauthService: OauthService) {
  }

  ngOnInit() {
    this.readOnlyPermitUrl = this.oauthService.getYoutubeReadOnlyPermitUrl('http://localhost:4200/youtube-response');
  }
}