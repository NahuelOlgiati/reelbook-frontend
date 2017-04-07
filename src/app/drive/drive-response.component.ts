import { DriveFile, PagedModelResponse, DriveService, OauthService } from '../app.backend';
import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';

declare var window: any;

@Component({
  selector: 'rb-drive-response',
  templateUrl: './drive-response.component.html',
  styleUrls: ['./drive-response.component.scss']
})
export class DriveResponseComponent implements OnInit {

  public success: Boolean = false; // TODO
  driveVideos: DriveFile[];

  constructor(private activatedRoute: ActivatedRoute, private driveService: DriveService, private oauthService: OauthService) {
  }

  onClick() {
    this.driveService.getUserFiles()
      .map((response: Response) => response.json())
      .map((res: PagedModelResponse<DriveFile>) => {
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
        this.oauthService.saveDriveCredential({ authCode: authCode, redirectUri: 'http://localhost:4200/user-update?credential=drive' })
          .map((response: Response) => response.json())
          .subscribe();
      }
    });
  }
}