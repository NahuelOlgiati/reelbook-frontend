import { BaseModel } from './base-model';

export class Artist extends BaseModel {

    constructor(id: number, public description: string, public summaryDescription: string) {
        super(id);
    }

    valueOf(): Object {
        return this.id;
    }
}