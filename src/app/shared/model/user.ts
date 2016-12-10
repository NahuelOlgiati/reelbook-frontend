import { BaseModel } from './core/base-model';

export class User extends BaseModel {

    public confirmPassword: string;

    constructor(id: number, public email: string, public username: string, public password: string) {
        super(id);
    }

    valueOf(): Object {
        return this.id;
    }
}