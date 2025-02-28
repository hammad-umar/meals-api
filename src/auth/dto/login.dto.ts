import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { lowerCaseTransformer } from '../../common';

export class LoginDto {
  @ApiProperty({ example: 'john@gmail.com', required: true })
  @Transform(lowerCaseTransformer)
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'John78612&', required: true })
  @IsString()
  @IsNotEmpty()
  password: string;
}
