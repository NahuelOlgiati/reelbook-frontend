import { YoutubeVideo, PagedModelResponse, YoutubeService, OauthService } from '../app.backend';
import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';

declare var window: any;

@Component({
  selector: 'rb-youtube-response',
  templateUrl: './youtube-response.component.html',
  styleUrls: ['./youtube-response.component.scss']
})
export class YoutubeResponseComponent implements OnInit {

  public success: Boolean = false; // TODO
  youtubeVideos: YoutubeVideo[];

  constructor(private activatedRoute: ActivatedRoute, private oauthService: OauthService, private youtubeService: YoutubeService) {
  }

  onClick() {
    this.youtubeService.getUserVideos()
      .map((response: Response) => response.json())
      .map((res: PagedModelResponse<YoutubeVideo>) => {
        this.youtubeVideos = res.queryList;
      })
      .subscribe();
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const authCode = params['code'];
      if (authCode) {
        this.oauthService.saveYoutubeCredential({ authCode: authCode, redirectUri: 'http://localhost:4200/user-update?credential=youtube' })
          .map((response: Response) => response.json())
          .subscribe();
      }
    });
  }
}