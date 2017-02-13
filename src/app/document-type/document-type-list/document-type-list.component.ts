import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentTypeService } from '../../shared/service/document-type.service';
import { GrowlMessageService } from '../../shared/service/core/growl-message.service';

@Component({
  selector: 'rb-document-type-list',
  templateUrl: './document-type-list.component.html'
})
export class DocumentTypeListComponent implements OnInit {

  documentTypes: DocumentType[] = [];
  error: any;

  text: string;
  results: DocumentType[];

  myForm: FormGroup;

  id: number;

  constructor(private fb: FormBuilder, private documentTypeService: DocumentTypeService, private growlMessageService: GrowlMessageService) {
    this.growlMessageService.onError(err => {
      this.error = err;
      console.log('onError: ' + err);
    });
  }

  ngOnInit() {
    this.documentTypeService.fetchData();
    this.documentTypeService.documentTypesChanged.subscribe(
      (documentTypes: DocumentType[]) => this.documentTypes = documentTypes
    );

    this.myForm = this.fb.group({
      description: ['', Validators.required],
      summaryDescription: ['', Validators.required],
    });
  }

  create() {
    this.documentTypeService.createDocumentType(this.myForm.value);
  }

  onEditClicked(documentType: M.DocumentType) {
    this.id = documentType.id;
    this.myForm.setValue({ description: 'hola', summaryDescription: 'HOLIS' });
    // console.log(JSON.stringify(documentType));
  }

  edit() {
    const dt: M.DocumentType = { 'documentTypeID': this.id, 'fullDescription': undefined, 'persisted': undefined, 'new': undefined, 'id': undefined, 'country': undefined, 'format': undefined, 'description': undefined, 'summaryDescription': undefined };
    console.log(JSON.stringify(dt));
    this.documentTypeService.editDocumentType(dt);
  }
}