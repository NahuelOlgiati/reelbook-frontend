import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DocumentType } from '../../shared/model/document-type';
import { DocumentTypeService } from '../document-type.service';
import { GrowlMessageService } from '../../service/growl-message.service';

@Component({
  selector: 'rb-document-type-wall',
  templateUrl: 'document-type-wall.component.html',
  styleUrls: ['./document-type-wall.component.scss']
})
export class DocumentTypeWallComponent implements OnInit {

  private isActive: boolean = false;

  documentTypes: DocumentType[];

  selectedDocumentType: DocumentType;

  displayDialog: boolean;

  constructor(private documentTypeService: DocumentTypeService) { }

  ngOnInit() {
    let a = new Array<DocumentType>();
    let x1 = new DocumentType(1, 'hola', 'hola');
    let x2 = new DocumentType(2, 'hola', 'hola');
    a.push(x1);
    a.push(x2);

    this.documentTypeService.fetchData();
    this.documentTypeService.documentTypesChanged.subscribe(
      (documentTypes: DocumentType[]) => this.documentTypes = documentTypes
    );
  }

  selectDocumentType(documentType: DocumentType) {
    this.selectedDocumentType = documentType;
    this.displayDialog = true;
  }

  onDialogHide() {
    this.selectedDocumentType = null;
  }
}