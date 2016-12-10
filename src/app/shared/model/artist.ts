import { BaseModel } from './core/base-model';
import { File } from './file';

export class Artist extends BaseModel {

    public file: File;

    constructor(id: number, public description: string) {
        super(id);
    }

    valueOf(): Object {
        return this.id;
    }
}