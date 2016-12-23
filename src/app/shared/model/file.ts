import { BaseModel } from './core/base-model';

export class File extends BaseModel {

    constructor(public fileID: number, public fileName: string, public content: string) {
        super(fileID);
    }

    valueOf(): number {
        return this.fileID;
    }
}