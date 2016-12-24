import { BaseModel } from './core/base-model';

export class User extends BaseModel {

    public confirmPassword: string;
    public artistID: number;

    constructor(public userID: number, public email: string, public userName: string, public firstName: string, public lastName: string, public password: string) {
        super(userID);
    }

    valueOf(): number {
        return this.userID;
    }
}