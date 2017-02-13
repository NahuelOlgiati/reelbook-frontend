import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class DocumentTypeService {

  public documentTypesChanged = new EventEmitter<M.DocumentType[]>();
  private documentTypes: M.DocumentType[] = [];

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getDocumentTypes(): M.DocumentType[] {
    return this.documentTypes;
  }

  fetchData() {
    this.http.get('/rest/documentType')
      .map((response: Response) => response.json())
      .map((data: M.DocumentType[]) => {
        this.documentTypes = data;
        this.documentTypesChanged.emit(this.documentTypes);
      }
      ).subscribe();
  }

  autocomplete(description: String): Observable<M.DocumentType> {
    return this.http.get('/rest/documentType/autocomplete:' + description + '?firstResult=0&maxResults=8')
      .map((response: Response) => response.json())
      .map((response: M.ModelResponse<M.DocumentType>) => response.model);
  }

  createDocumentType(documentType: M.DocumentType) {
    this.http.post('/rest/documentType', JSON.stringify(documentType), this.options)
      .map((response: Response) => response.json())
      .map((res: M. ModelResponse<M.DocumentType>) => {
        this.documentTypes.push(res.model);
        this.documentTypesChanged.emit(this.documentTypes);
      }
      ).subscribe();
  }

  editDocumentType(documentType: M.DocumentType) {
    this.http.put('/rest/documentType', JSON.stringify(documentType), this.options)
      .map((response: Response) => response.json())
      .map((res: M.ModelResponse<M.DocumentType>) => {
        this.documentTypes = this.documentTypes.filter((t, n, arr) => t.id !== res.model.id);
        this.documentTypes.push(res.model);
        this.documentTypesChanged.emit(this.documentTypes);
      }
      ).subscribe();
  }

  removeDocumentType(documentType: M.DocumentType) {
    this.http.delete('/rest/documentType/' + documentType.id, this.options)
      .map((response: Response) => response.json())
      .map((res: M.ModelResponse<M.DocumentType>) => {
        this.documentTypes = this.documentTypes.filter((t, n, arr) => t.id !== res.model.id);
        this.documentTypesChanged.emit(this.documentTypes);
      }
      ).subscribe();
  }

}