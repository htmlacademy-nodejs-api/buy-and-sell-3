import {Expose} from 'class-transformer';

export default class UploadUserAvatarResponse {
  @Expose()
  public filepath!: string;
}
