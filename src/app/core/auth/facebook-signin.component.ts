import {Component, OnInit} from '@angular/core';

declare const FB: any;

@Component({
    selector: 'rb-facebook-signin',
    template: `<button type="button" class="button btn-fb small fit" (click)="onFacebookLoginClick()"><i class="fa fa-facebook"></i> Facebook</button>`
})
export class FacebookSigninComponent implements OnInit {

    constructor() {
        FB.init({
            appId: '513290545535052',
            cookie: false,
            xfbml: true,
            version: 'v2.7'
        });
    }

    onFacebookLoginClick() {
        FB.login(
            function (response) {
                if (response.authResponse) {
                    console.log('Welcome!  Fetching your information.... ');
                    FB.api('/me?fields=id,name,email,permissions', function (response) {
                        console.log('Good to see you, ' + response.email + '.');
                    });
                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            }
        );
    }

    statusChangeCallback(resp) {
        if (resp.status === 'connected') {
            // connect here with your server for facebook login by passing access token given by facebook
            FB.api('/me', function (resp) {
                console.log('Good to see you, ' + resp.name + '.');
            });
        } else if (resp.status === 'not_authorized') {

        } else {

        }
    };

    ngOnInit() {
        FB.getLoginStatus(response => {
            this.statusChangeCallback(response);
        });
    }
}