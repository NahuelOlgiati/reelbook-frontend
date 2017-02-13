import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { YoutubeService } from '../shared/service/youtube.service';

declare var window: any;

@Component({
  selector: 'rb-youtube-response',
  templateUrl: './youtube-response.component.html',
  styleUrls: ['./youtube-response.component.scss']
})
export class YoutubeResponseComponent implements OnInit {

  public success: Boolean = false; // TODO
  youtubeVideos: M.YoutubeVideo[];

  constructor(private activatedRoute: ActivatedRoute, private youtubeService: YoutubeService) {
  }

  onClick() {
    this.youtubeService.getUserVideos()
      .map((res: M.PagedModelResponse<M.YoutubeVideo>) => {
        this.youtubeVideos = res.queryList;
      })
      .subscribe();
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const accessToken = params['code'];
      this.youtubeService.getAccessToken(accessToken, 'http://localhost:4200/youtube-response')
        .flatMap((response: any) => this.youtubeService.saveCredential(accessToken, response.refresh_token))
        .map((response: any) => { console.log('entro'); console.log(response); })
        .subscribe();
    });
  }
}