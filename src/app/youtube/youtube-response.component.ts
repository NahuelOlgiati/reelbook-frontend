import { YoutubeVideo, PagedModelResponse } from '../app.backend';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OauthService } from '../shared/service/oauth.service';
import { YoutubeService } from '../shared/service/youtube.service';

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
      .map((res: PagedModelResponse<YoutubeVideo>) => {
        this.youtubeVideos = res.queryList;
      })
      .subscribe();
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const authCode = params['code'];
      if (authCode) {
        this.oauthService.saveYoutubeCredential(authCode, 'http://localhost:4200/user-update')
          .subscribe();
      }
    });
  }
}