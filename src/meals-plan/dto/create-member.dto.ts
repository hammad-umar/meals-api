import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { lowerCaseTransformer } from 'src/common';

export class CreateMemberDto {
  @ApiProperty({ example: 'John Doe', required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'john@gmail.com', required: true })
  @IsString()
  @IsEmail()
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'vegetarian', required: true })
  @IsString()
  @IsNotEmpty()
  dietaryRestrictions: string;
}
