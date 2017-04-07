import { Injectable } from '@angular/core';
import { Http, ConnectionBackend, Request, RequestOptions, RequestOptionsArgs, RequestMethod, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { GrowlMessageService } from './growl-message.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CustomHttp extends Http {

  constructor(backend: ConnectionBackend,
    defaultOptions: RequestOptions,
    private router: Router,
    private growlMessageService: GrowlMessageService) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    let req: Request;
    if (typeof url === 'string') {
      const reqOpt = new RequestOptions(options);
      reqOpt.url = url;
      req = new Request(reqOpt);
    } else {
      req = url;
    }
    return super.request(url, options);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    const opt = this._buildRequestOptionsArgs(RequestMethod.Get, url, options, null);
    this._beforeCall(url, opt);
    return this._handle(super.get(url, opt), url, opt);
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    const opt = this._buildRequestOptionsArgs(RequestMethod.Post, url, options, body);
    this._beforeCall(url, opt);
    return this._handle(super.post(url, body, opt), url, opt);
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    const opt = this._buildRequestOptionsArgs(RequestMethod.Put, url, options, body);
    this._beforeCall(url, opt);
    return this._handle(super.put(url, body, opt), url, opt);
  }

  patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    const opt = this._buildRequestOptionsArgs(RequestMethod.Patch, url, options, body);
    this._beforeCall(url, opt);
    return this._handle(super.patch(url, body, opt), url, opt);
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    const opt = this._buildRequestOptionsArgs(RequestMethod.Delete, url, options, null);
    this._beforeCall(url, opt);
    return this._handle(super.delete(url, opt), url, opt);
  }

  private _handle(observable: Observable<Response>, url: string, options?: RequestOptionsArgs): Observable<any> {
    return observable
      .catch((err: any): any => {
        console.log(err);
        if (err.status === 400 || err.status === 401 || err.status === 422) {
          console.log('Notifying...');
          console.log(err.json());
          this.growlMessageService.notifyError(err.json());
          return Observable.empty();
        } else {
          console.log('Redirecting...');
          this.router.navigate(['/error-page']);
          return Observable.empty();
        }
      })
      .retryWhen(error => error.delay(500))
      .timeout(200000)
      .finally(() => {
        this._afterCall(url, options);
      });
  }

  private _buildRequestOptionsArgs(method: RequestMethod, url: string, options?: RequestOptionsArgs, body?: string): RequestOptionsArgs {
    return {
      method: method,
      url: url,
      headers: options && options.headers ? options.headers : new Headers(),
      search: options && options.search ? options.search : undefined,
      body: body ? body : options && options.body ? options.body : undefined
    };
  }

  private _beforeCall(url: string, options?: RequestOptionsArgs): void {
    console.log('Before the request...');
    options.headers.set('Authorization', 'Basic ' + localStorage.getItem('token'));
  }

  private _afterCall(url: string, options?: RequestOptionsArgs) {
    console.log('After the request...');
    console.log('Request Url: ' + url);
  }
}
