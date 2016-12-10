import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DocumentType } from '../../shared/model/document-type';
import { DocumentTypeService } from '../document-type.service';
import { GrowlMessageService } from '../../shared/service/growl-message.service';

@Component({
  selector: 'rb-document-type-wall',
  templateUrl: 'document-type-wall.component.html',
  styleUrls: ['./document-type-wall.component.scss']
})
export class DocumentTypeWallComponent implements OnInit {

  documentTypes: DocumentType[];
  selectedDocumentTypes: number[] = [];

  deploySelection: boolean = false;

  constructor(private documentTypeService: DocumentTypeService) { }

  ngOnInit() {
    this.documentTypeService.fetchData();
    this.documentTypeService.documentTypesChanged.subscribe(
      (documentTypes: DocumentType[]) => this.documentTypes = documentTypes
    );
  }

  onActive(documentType: DocumentType) {
    if (this.isActive(documentType)) {
      this.selectedDocumentTypes.splice(this.selectedDocumentTypes.indexOf(documentType.id), 1);
    } else {
      this.selectedDocumentTypes.push(documentType.id);
    }
  }

  isActive(documentType: DocumentType): Boolean {
    return this.selectedDocumentTypes.indexOf(documentType.id) >= 0;
  }

  getSelectedDocumentTypes(): DocumentType[] {
    if (this.documentTypes != undefined)
      return this.documentTypes.filter(
        (value: DocumentType, index: number, array: DocumentType[]) => (this.selectedDocumentTypes.indexOf(value.id) >= 0));
  }

  onAutocompletFilter(documentTypes: DocumentType[]) {
    console.log(this.selectedDocumentTypes);
    
    if (documentTypes != undefined)
      documentTypes.forEach(ace => {
        let existIn = false;
        this.selectedDocumentTypes.forEach(se => {
          if (ace.id == se) existIn = true;
        });

        if(!existIn)
          this.selectedDocumentTypes.push(ace.id);
      });

      console.log(this.selectedDocumentTypes);
  }
  
}