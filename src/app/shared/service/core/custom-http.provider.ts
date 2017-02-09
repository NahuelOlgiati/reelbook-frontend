import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { CustomHttp } from './custom-http.http';
import { GrowlMessageService } from './growl-message.service';

export function httpFactory(backend: XHRBackend,
  defaultOptions: RequestOptions,
  router: Router,
  growlMessageService: GrowlMessageService) {
  return new CustomHttp(backend, defaultOptions, router, growlMessageService);
}
export const CustomHttpProvider = [
  {
    provide: Http,
    useFactory: httpFactory,
    deps: [XHRBackend, RequestOptions, Router, GrowlMessageService]
  }];