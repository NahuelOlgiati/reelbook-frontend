import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../shared/service/youtube.service';
import { DriveService } from '../shared/service/drive.service';
import { Observable } from 'rxjs'

@Component({
  selector: 'rb-oauth-bar',
  template: `
              <a *ngIf="hasYoutubeCredential" class="btn btn-block btn-social btn-twitter">
                <span class="fa fa-twitter"></span> Tiene
              </a>
              <a *ngIf="!hasYoutubeCredential" class="btn btn-block btn-social btn-twitter">
                <span class="fa fa-twitter"></span> No Tiene
              </a>
              <a [href]="readOnlyPermitUrl">
                  <div>Drive Read Only Permssion</div>
              </a>
            `
})
export class OauthBarComponent implements OnInit {

  public readOnlyPermitUrl: String;
  public hasYoutubeCredential: Boolean = false;
  public hasDriveCredential: Boolean = false;

  constructor(private youtubeService: YoutubeService, private driveService: DriveService) {
  }

  // TODO make OAUTH ENDPOINT
  ngOnInit() {
    this.youtubeService.hasCredential()
      .map((res: M.ModelResponse<Boolean>) => {
        if (res.success) {
          this.hasYoutubeCredential = res.model;
          if (!res.model) this.readOnlyPermitUrl = this.youtubeService.getReadOnlyPermitUrl('http://localhost:4200/user-update');
        };
      })
      .subscribe();
  }
}