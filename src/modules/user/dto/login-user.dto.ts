import {IsEmail, IsString} from 'class-validator';

export default class LoginUserDto {
  @IsEmail({}, {message: 'email must be a valid address'})
  public email!: string;

  @IsString({message: 'password is required'})
  public password!: string;
}
