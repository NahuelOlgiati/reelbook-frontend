import { BaseModel } from './core/base-model';
import { User } from './user';

export class Session extends BaseModel {

  constructor(public restSessionID: number, public user: User, public lastAccess: Date, public token: string, public expires: Boolean) {
    super(restSessionID);
  }

  valueOf(): number {
    return this.restSessionID;
  }
}