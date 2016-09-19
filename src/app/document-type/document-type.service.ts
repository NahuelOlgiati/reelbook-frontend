import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";
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

}