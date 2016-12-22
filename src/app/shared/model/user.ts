import { BaseModel } from './core/base-model';

export class User extends BaseModel {

    public confirmPassword: string;

    constructor(id: number, public email: string, public userName: string, public firstName: string, public lastName: string, public password: string) {
        super(id);
    }

    valueOf(): Object {
        return this.id;
    }
}