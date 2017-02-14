import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DriveService } from '../shared/service/drive.service';

declare var window: any;

@Component({
  selector: 'rb-drive-response',
  templateUrl: './drive-response.component.html',
  styleUrls: ['./drive-response.component.scss']
})
export class DriveResponseComponent implements OnInit {

  public success: Boolean = false; // TODO
  driveVideos: M.DriveFile[];

  constructor(private activatedRoute: ActivatedRoute, private driveService: DriveService) {
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
      const accessToken = params['code'];
      this.driveService.getAccessToken(accessToken, 'http://localhost:4200/drive-response')
        .flatMap((response: any) => this.driveService.saveCredential(accessToken, response.refresh_token))
        .map((response: any) => { console.log('entro'); console.log(response); })
        .subscribe();
    });
  }
}