import { Component, OnInit } from '@angular/core';
import { DocumentTypeService } from '../../shared/service/document-type.service';

@Component({
  selector: 'rb-document-type-wall',
  templateUrl: './document-type-wall.component.html',
  styleUrls: ['./document-type-wall.component.scss']
})
export class DocumentTypeWallComponent implements OnInit {

  documentTypes: M.DocumentType[];
  selectedDocumentTypes: Number[] = [];

  deploySelection: Boolean = false;

  constructor(private documentTypeService: DocumentTypeService) { }

  ngOnInit() {
    this.documentTypeService.fetchData();
    this.documentTypeService.documentTypesChanged.subscribe(
      (documentTypes: M.DocumentType[]) => this.documentTypes = documentTypes
    );
  }

  onActive(documentType: M.DocumentType) {
    if (this.isActive(documentType)) {
      this.selectedDocumentTypes.splice(this.selectedDocumentTypes.indexOf(documentType.id), 1);
    } else {
      this.selectedDocumentTypes.push(documentType.id);
    }
  }

  isActive(documentType: M.DocumentType): Boolean {
    return this.selectedDocumentTypes.indexOf(documentType.id) >= 0;
  }

  getSelectedDocumentTypes(): M.DocumentType[] {
    if (this.documentTypes)
      return this.documentTypes.filter(
        (value: M.DocumentType, index: number, array: M.DocumentType[]) => (this.selectedDocumentTypes.indexOf(value.id) >= 0));
  }

  onAutocompletFilter(documentTypes: M.DocumentType[]) {
    console.log(this.selectedDocumentTypes);

    if (documentTypes)
      documentTypes.forEach((ace: M.DocumentType) => {
        let existIn = false;
        this.selectedDocumentTypes.forEach(se => {
          if (ace.id == se) existIn = true;
        });

        if (!existIn)
          this.selectedDocumentTypes.push(ace.id);
      });

    console.log(this.selectedDocumentTypes);
  }

}