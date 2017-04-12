import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManager } from '../shared/manager/core/session.manager';

@Component({
  selector: 'rb-submenu',
  template: `
  <ul class="links">
    <li *ngFor="let option of options">
      <a [routerLink]="['mandanga']">Home</a>
    </li>
  </ul>

  `,
})
export class SubMenuComponent implements OnInit, AfterViewInit {

  options: string[];

  constructor(private router: Router, private sessionManager: SessionManager) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }
}
