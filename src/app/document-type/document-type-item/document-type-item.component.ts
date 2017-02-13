import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DocumentTypeService } from '../../shared/service/document-type.service';

@Component({
  selector: 'rb-document-type-item',
  templateUrl: './document-type-item.component.html'
})
export class DocumentTypeItemComponent implements OnInit {

  @Input() documentType: M.DocumentType;
  @Output() editClicked = new EventEmitter<M.DocumentType>();

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