import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DocumentType } from '../../shared/model/document-type';

import { DocumentTypeService } from '../document-type.service';

@Component({
  selector: 'rb-document-type-item',
  templateUrl: 'document-type-item.component.html'
})
export class DocumentTypeItemComponent implements OnInit {

  @Input() documentType: DocumentType;
  @Output() editClicked = new EventEmitter<DocumentType>();

  constructor(private documentTypeService: DocumentTypeService) { }

  ngOnInit() {
  }

  remove() {
    this.documentTypeService.removeDocumentType(this.documentType);
  }

  edit() {
    this.editClicked.emit(this.documentType);
  }
}