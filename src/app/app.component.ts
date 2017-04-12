import { Component, OnInit } from '@angular/core';

import { Message } from 'primeng/primeng';

import { GrowlMessageService } from './shared/service/core/growl-message.service';

@Component({
  selector: 'rb-root',
  template: `
<!-- Wrapper -->
<div id="wrapper">

	<!-- Growl -->
	<p-growl [value]="msgs"></p-growl>

	<!-- Header -->
	<rb-header></rb-header>

	<!-- Menu -->
	<rb-menu></rb-menu>

  <!-- Body -->
  <rb-body></rb-body>

	<!-- Footer -->
	<rb-footer></rb-footer>

</div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  msgs: Message[] = [];

  constructor(private growlMessageService: GrowlMessageService) { }

  ngOnInit() {
    this.growlMessageService.onError((msgs: Message[]) => {
      this.msgs.splice(0, this.msgs.length);
      for (let i = 0; i < msgs.length; i++) {
        this.msgs.push(msgs[i]);
      }
    });
  }
}
