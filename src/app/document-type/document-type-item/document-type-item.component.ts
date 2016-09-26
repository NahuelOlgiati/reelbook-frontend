import { Component, OnInit, Input } from '@angular/core';
import { DocumentType } from '../document-type';

import { DocumentTypeService } from '../document-type.service';

@Component({
  selector: 'rb-document-type-item',
  templateUrl: 'document-type-item.component.html'
})
export class DocumentTypeItemComponent implements OnInit {

  @Input() documentType: DocumentType;

  constructor(private documentTypeService: DocumentTypeService) { }

  ngOnInit() {
  }

  remove(){
    this.documentTypeService.removeDocumentType(this.documentType);
  }
}