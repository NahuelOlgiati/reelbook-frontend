import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { CustomHttp } from "./custom-http.http";
import { GrowlMessageService } from '../../shared/service/growl-message.service';
import { Router } from '@angular/router';

export const CustomHttpProvider = [GrowlMessageService,
    {
        provide: Http,
        useFactory: (backend: XHRBackend, defaultOptions: RequestOptions, growlMessageService: GrowlMessageService, router: Router) => {
            return new CustomHttp(backend, defaultOptions, growlMessageService, router);
        },
        deps: [XHRBackend, RequestOptions, GrowlMessageService, Router]
    }];