import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response, RequestOptions} from "@angular/http";
import { DocumentType } from '../shared/model/document-type';
import { ModelResponse } from '../shared/model/model-response';
import 'rxjs/add/operator/map';

@Injectable()
export class DocumentTypeService {

  public documentTypesChanged = new EventEmitter<DocumentType[]>();
  private documentTypes: DocumentType[] = [];

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getDocumentTypes(): DocumentType[] {
    return this.documentTypes;
  }

  fetchData() {
    return this.http.get('http://localhost:8080/rest/documentType')
      .map((response: Response) => response.json())
      .subscribe((data: DocumentType[]) => {
        this.documentTypes = data;
        this.documentTypesChanged.emit(this.documentTypes);
      }
      );
  }

  createDocumentType(documentType: DocumentType) {
    return this.http.post('http://localhost:8080/rest/documentType', JSON.stringify(documentType), this.options)
      .map((response: ModelResponse<DocumentType>) => response.json())
      .subscribe((res: ModelResponse<DocumentType>) => {
        this.documentTypes.push(res.model);
        this.documentTypesChanged.emit(this.documentTypes);
      }
      );
  }

  editDocumentType(documentType: DocumentType) {
    return this.http.put('http://localhost:8080/rest/documentType', JSON.stringify(documentType), this.options)
      .map((response: ModelResponse<DocumentType>) => response.json())
      .subscribe((res: ModelResponse<DocumentType>) => {
        this.documentTypes = this.documentTypes.filter((t, n, arr) => t.id !== res.model.id);
        this.documentTypes.push(res.model);
        this.documentTypesChanged.emit(this.documentTypes);
      }
      );
  }

  removeDocumentType(documentType: DocumentType) {
    return this.http.delete('http://localhost:8080/rest/documentType/' + documentType.id, this.options)
      .map((response: ModelResponse<DocumentType>) => response.json())
      .subscribe((res: ModelResponse<DocumentType>) => {
        this.documentTypes = this.documentTypes.filter((t, n, arr) => t.id !== res.model.id);
        this.documentTypesChanged.emit(this.documentTypes);
      }
      );
  }

}