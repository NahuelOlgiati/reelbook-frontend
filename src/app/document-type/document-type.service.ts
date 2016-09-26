import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response, RequestOptions} from "@angular/http";
import { DocumentType } from './document-type';
import 'rxjs/add/operator/map';

@Injectable()
export class DocumentTypeService {

  documentTypesChanged = new EventEmitter<DocumentType[]>();

  private documentTypes: DocumentType[] = [];

  constructor(private http: Http) { }

  getDocumentTypes(): DocumentType[] {
    return this.documentTypes;
  }

  fetchData() {
    return this.http.get('http://localhost:8080/rest/documentType')
      .map((response: Response) => response.json())
      .subscribe(
      (data: DocumentType[]) => {
        this.documentTypes = data;
        this.documentTypesChanged.emit(this.documentTypes);
      }
      );
  }

  createDocumentType(documentType : DocumentType) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:8080/rest/documentType', JSON.stringify(documentType), options)
      .map((response: Response) => response.json())
      .subscribe(
      (data: DocumentType[]) => {
        this.documentTypes = data;
        this.documentTypesChanged.emit(this.documentTypes);
      }
      );
  }

}