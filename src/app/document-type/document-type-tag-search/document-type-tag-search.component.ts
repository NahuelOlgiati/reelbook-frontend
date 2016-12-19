import { Component, Output, EventEmitter } from '@angular/core';
import { DocumentTypeService } from '../../shared/service/document-type.service';

@Component({
  selector: 'rb-document-type-tag-search',
  templateUrl: './document-type-tag-search.component.html'
})
export class DocumentTypeTagSearchComponent {

  text: string;
  documentTypes: DocumentType[];
  @Output() autocompleteSelected = new EventEmitter<DocumentType[]>();

  constructor(private documentTypeService: DocumentTypeService) {
  }

  search(event) {
    this.documentTypeService.autocomplete(event.query).map(
      (res: any) => {
        this.documentTypes = res.queryList;
        this.autocompleteSelected.emit(this.documentTypes);
      }).subscribe();
  }
}