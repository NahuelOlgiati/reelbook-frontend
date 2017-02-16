import { Component, OnInit } from '@angular/core';
import { OauthService } from '../shared/service/oauth.service';

@Component({
  selector: 'rb-drive-readonly',
  template: `
              <a [href]="readOnlyPermitUrl">
                  <div>Drive Read Only Permssion</div>
              </a>
            `
})
export class DriveReadOnlyComponent implements OnInit {

  public readOnlyPermitUrl: String;

  constructor(private oauthService: OauthService) {
  }

  ngOnInit() {
    this.readOnlyPermitUrl = this.oauthService.getDriveReadOnlyPermitUrl('http://localhost:4200/drive-response');
  }
}