import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Message } from 'primeng/primeng';

import { GrowlMessageService } from "./service/growl-message.service";

@Component({
  selector: 'rb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  msgs: Message[] = [];

  constructor(private growlMessageService: GrowlMessageService) { }

  ngOnInit() {
    this.growlMessageService.onError((msgs: Message[]) => {
      this.msgs.splice(0, this.msgs.length);
      for (var i = 0; i < msgs.length; i++) {
        this.msgs.push(msgs[i]);
      }
    });
  }
}
