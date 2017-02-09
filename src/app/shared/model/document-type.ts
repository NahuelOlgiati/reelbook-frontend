import { BaseModel } from './core/base-model';

export class DocumentType extends BaseModel {

  constructor(public documentTypeID: Number, public description: String, public summaryDescription: String) {
    super(documentTypeID);
  }

  valueOf(): Number {
    return this.documentTypeID;
  }
}