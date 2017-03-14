import { ModelResponse } from '../app.backend';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OauthService } from '../shared/service/oauth.service';

@Component({
  selector: 'rb-oauth-bar',
  template: `
              <a *ngIf="hasDriveCredential" class="btn btn-block btn-social btn-twitter">
                <span class="fa fa-twitter"></span> Tiene
              </a>
              <a *ngIf="!hasDriveCredential" [href]="driveReadOnlyPermitUrl" class="btn btn-block btn-social btn-twitter">
                <span class="fa fa-twitter"></span> No Tiene
              </a>

              <a *ngIf="hasYoutubeCredential" class="btn btn-block btn-social btn-youtube">
                <span class="fa fa-youtube"></span> Tiene
              </a>
              <a *ngIf="!hasYoutubeCredential" [href]="youtubeReadOnlyPermitUrl" class="btn btn-block btn-social btn-youtube">
                <span class="fa fa-youtube"></span> No Tiene
              </a>
            `
})
export class OauthBarComponent implements OnInit {

  public hasYoutubeCredential: Boolean = false;
  public youtubeReadOnlyPermitUrl: String;
  public hasDriveCredential: Boolean = false;
  public driveReadOnlyPermitUrl: String;

  constructor(private activatedRoute: ActivatedRoute, private oauthService: OauthService) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const credential = params['credential'];
      const authCode = params['code'];
      if ('youtube' == credential) {
        this.oauthService.saveYoutubeCredential(authCode, 'http://localhost:4200/user-update')
          .subscribe();
      }

      if ('drive' == credential) {
        this.oauthService.saveDriveCredential(authCode, 'http://localhost:4200/user-update')
          .subscribe();
      }
    });


    this.oauthService.hasYoutubeCredential()
      .do((res: ModelResponse<Boolean>) => {
        if (res.success) {
          this.hasYoutubeCredential = res.model;
          if (!this.hasYoutubeCredential) {
            this.youtubeReadOnlyPermitUrl = this.oauthService.getYoutubeReadOnlyPermitUrl('http://localhost:4200/user-update');
          }
        };
      })
      .subscribe();

    this.oauthService.hasDriveCredential()
      .do((res: ModelResponse<Boolean>) => {
        if (res.success) {
          this.hasDriveCredential = res.model;
          if (!this.hasDriveCredential) {
            this.driveReadOnlyPermitUrl = this.oauthService.getDriveReadOnlyPermitUrl('http://localhost:4200/user-update');
          }
        };
      })
      .subscribe();
  }
}