import { BaseModel } from './core/base-model';

export class YoutubeCredential extends BaseModel {

  constructor(public youtubeCredentialID: number, public accessToken: string, public refreshToken: string) {
    super(youtubeCredentialID);
  }

  valueOf(): number {
    return this.youtubeCredentialID;
  }
}