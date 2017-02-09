import { BaseModel } from './core/base-model';

export class AudioVisual extends BaseModel {

  public confirmPassword: string;
  public artistID: number;

  constructor(public audioVisualID: number, public email: string, public audioVisualName: string, public firstName: string, public lastName: string, public password: string) {
    super(audioVisualID);
  }

  valueOf(): number {
    return this.audioVisualID;
  }
}