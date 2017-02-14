import { Component, OnInit } from '@angular/core';
import { DriveService } from '../shared/service/drive.service';

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

  constructor(private driveService: DriveService) {
  }

  ngOnInit() {
    this.readOnlyPermitUrl = this.driveService.getReadOnlyPermitUrl('http://localhost:4200/drive-response');
  }
}