import { BaseModel } from './core/base-model';
import { File } from './file';

export class Artist extends BaseModel {

    public file: File;

    constructor(public artistID: number, public description: string) {
        super(artistID);
    }

    valueOf(): number {
        return this.artistID;
    }
}