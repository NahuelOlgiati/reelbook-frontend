import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DocumentType } from '../document-type';
import { DocumentTypeService } from '../document-type.service';
import { GrowlMessageService } from '../../shared/growl-message/growl-message.service';

@Component({
  selector: 'rb-document-type-list',
  templateUrl: 'document-type-list.component.html'
})
export class DocumentTypeListComponent implements OnInit {

  documentTypes: DocumentType[] = [];
  error: any;

  text: string;
  results: DocumentType[];

  myForm: FormGroup;

  id : number;

  constructor(private fb: FormBuilder, private documentTypeService: DocumentTypeService, private growlMessageService: GrowlMessageService) {
    this.growlMessageService.onError(err => {
      this.error = err;
      console.log("onError: " + err);
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

  onEditClicked(documentType: DocumentType){
    this.id = documentType.id;
    this.myForm.setValue({description : 'hola', summaryDescription:'HOLIS'});
    //console.log(JSON.stringify(documentType));
  }

  edit() {
    let dt = new DocumentType(this.id, this.myForm.value.description, this.myForm.value.summaryDescription);
    console.log(JSON.stringify(dt));
    this.documentTypeService.editDocumentType(dt);
  }
}