export abstract class BaseModel implements Object {

  constructor(public id: Number = 0) { }

  valueOf(): Object {
    return this.id;
  }
}