import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchQueryDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  searchTerm: string;
}
