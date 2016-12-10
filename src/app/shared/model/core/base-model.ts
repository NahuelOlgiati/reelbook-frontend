export abstract class BaseModel implements Object {

    constructor(public id: number = 0) { }

    valueOf(): Object {
        return this.id;
    }
}