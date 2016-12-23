import { BaseModel } from './core/base-model';

export class DocumentType extends BaseModel {
    
    constructor(public documentTypeID: number, public description: string, public summaryDescription: string) {
        super(documentTypeID);
    }

    valueOf(): number {
        return this.documentTypeID;
    }
}