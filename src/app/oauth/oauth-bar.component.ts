import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OauthService } from '../app.backend';
import { SessionManager } from '../shared/manager/core/session.manager';
import { OauthManager } from '../shared/manager/core/oauth.manager';

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

  constructor(private activatedRoute: ActivatedRoute, private oauthService: OauthService, private sessionManager: SessionManager, private oauthManager: OauthManager) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const credential = params['credential'];
      const authCode = params['code'];
      if ('youtube' == credential) {
        this.oauthService.saveYoutubeCredential({ authCode: authCode, redirectUri: 'http://localhost:4200/user-update?credential=youtube' })
          .subscribe();
      }

      if ('drive' == credential) {
        this.oauthService.saveDriveCredential({ authCode: authCode, redirectUri: 'http://localhost:4200/user-update?credential=drive' })
          .subscribe();
      }
    });

    const oauthCredential = this.sessionManager.getUser().oauthCredential;

    this.hasYoutubeCredential = oauthCredential.youtubeRefreshToken ? true : false;
    if (!this.hasYoutubeCredential) {
      this.youtubeReadOnlyPermitUrl = this.oauthManager.getYoutubeReadOnlyPermitUrl('http://localhost:4200/user-update');
    }

    this.hasDriveCredential = oauthCredential.driveRefreshToken ? true : false;
    if (!this.hasDriveCredential) {
      this.driveReadOnlyPermitUrl = this.oauthManager.getDriveReadOnlyPermitUrl('http://localhost:4200/user-update');
    }
  }
}
