import { IsNotEmpty, IsEmail, Length } from 'class-validator';

export class UserSignupDto {
  @IsEmail()
  @IsNotEmpty({ message: 'Email cant be empty' })
  email: string;

  @Length(3, 12)
  @IsNotEmpty({ message: 'Password cant be empty' })
  password: string;

  @IsNotEmpty({ message: 'Name cant be empty' })
  name: string;

  @IsNotEmpty({ message: 'Phone cant be empty' })
  phone: string;

  @IsNotEmpty({ message: 'SSN cant be empty' })
  ssn: string;
}

export class UserLoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(3, 12)
  @IsNotEmpty()
  password: string;
}
