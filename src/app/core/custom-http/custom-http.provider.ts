import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { CustomHttp } from "./custom-http.http";
import { GrowlMessageService } from '../../shared/growl-message/growl-message.service';
import { Router } from '@angular/router';

export const CUSTOM_HTTP_PROVIDER = [GrowlMessageService,
    {
        provide: Http,
        useFactory: (backend: XHRBackend, defaultOptions: RequestOptions, growlMessageService: GrowlMessageService, router: Router) => {
            return new CustomHttp(backend, defaultOptions, growlMessageService, router);
        },
        deps: [XHRBackend, RequestOptions, GrowlMessageService, Router]
    }];