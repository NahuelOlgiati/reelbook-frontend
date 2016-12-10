import { Response, ResponseOptions } from "@angular/http";

export class PagedModelResponse<T> extends Response {

    constructor(public success: boolean, public rowCount: number, public queryList: T[], public responseOptions: ResponseOptions) {
        super(responseOptions);
    }

}