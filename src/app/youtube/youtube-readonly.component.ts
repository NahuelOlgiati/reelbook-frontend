import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../shared/service/youtube.service';

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

  constructor(private youtubeService: YoutubeService) {
  }

  ngOnInit() {
    this.readOnlyPermitUrl = this.youtubeService.getReadOnlyPermitUrl('http://localhost:4200/youtube-response');
  }
}