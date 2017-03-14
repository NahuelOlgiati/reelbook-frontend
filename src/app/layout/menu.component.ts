import { User, RestSession } from '../app.backend';
import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManager } from '../shared/manager/core/session.manager';

@Component({
  selector: 'rb-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit, AfterViewInit {

  sessionUser: User;
  hasArtistProfile: boolean;
  avatarDataSquare: any = {
    size: 40,
    background: '#F39C12', // by default it will produce dynamic colors
    fontColor: '#FFFFFF',
    border: '2px solid #d3d3d3',
    isSquare: true
  };

  constructor(private router: Router, private sessionManager: SessionManager) {
    this.sessionManager.sessionChanged.subscribe((session: RestSession) => {
      if (session) {
        this.hasArtistProfile = Boolean(session.user.artistID);
        this.avatarDataSquare.text = this.sessionManager.getFullName();
      } else {
        this.hasArtistProfile = undefined;
      }
    });
  }

  ngOnInit() {
    this.sessionUser = this.sessionManager.getUser();
    if (this.sessionUser) {
      this.avatarDataSquare.text = this.sessionManager.getFullName();
    }
  }

  ngAfterViewInit(): void {
    if (!this.sessionUser) {
      this.sessionManager.fetchSession();
    }
  }

  isAuth() {
    return this.sessionManager.isAuthenticated();
  }

  onAvatarClick() {
    this.router.navigate(['/artist-create']);
  }
}