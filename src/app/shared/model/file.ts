import { BaseModel } from './core/base-model';

export class File extends BaseModel {

    constructor(id: number, public fileName: string, public content: string) {
        super(id);
    }

    valueOf(): Object {
        return this.id;
    }
}