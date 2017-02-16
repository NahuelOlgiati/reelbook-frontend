import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DriveService } from '../shared/service/drive.service';
import { OauthService } from '../shared/service/oauth.service';

declare var window: any;

@Component({
  selector: 'rb-drive-response',
  templateUrl: './drive-response.component.html',
  styleUrls: ['./drive-response.component.scss']
})
export class DriveResponseComponent implements OnInit {

  public success: Boolean = false; // TODO
  driveVideos: M.DriveFile[];

  constructor(private activatedRoute: ActivatedRoute, private driveService: DriveService, private oauthService: OauthService) {
  }

  onClick() {
    this.driveService.getUserVideos()
      .map((res: M.PagedModelResponse<M.DriveFile>) => {
        console.log(res.queryList[0]);
        console.log(res.queryList);
        this.driveVideos = res.queryList;
      })
      .subscribe();
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const authCode = params['code'];
      if (authCode) {
        this.oauthService.saveDriveCredential(authCode, 'http://localhost:4200/user-update')
          .subscribe();
      }
    });
  }
}