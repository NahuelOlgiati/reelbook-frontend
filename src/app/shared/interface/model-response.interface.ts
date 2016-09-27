import { Response, ResponseOptions } from "@angular/http";
export class ModelResponse<T> extends Response {
    constructor(public success: boolean, public model: T, public responseOptions: ResponseOptions) {
        super(responseOptions);
    }
}