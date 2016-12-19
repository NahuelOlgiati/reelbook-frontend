import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { CustomHttp } from "./custom-http.http";
import { GrowlMessageService } from './growl-message.service';
import { Router } from '@angular/router';

export function httpFactory(backend: XHRBackend, defaultOptions: RequestOptions, growlMessageService: GrowlMessageService, router: Router) {
    return new CustomHttp(backend, defaultOptions, growlMessageService, router);
}
export const CustomHttpProvider = [GrowlMessageService,
    {
        provide: Http,
        useFactory: httpFactory,
        deps: [XHRBackend, RequestOptions, GrowlMessageService, Router]
    }];