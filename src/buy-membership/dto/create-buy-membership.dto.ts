import {
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBuyMembershipDto {
  @IsNumber()
  price: number;

  @IsDate()
  @IsOptional()
  date: Date;

  @IsArray()
  benefits: string[];

  @IsString()
  planName: string;

  @IsString()
  description: string;

  @IsNumber()
  chatsNumber: number;

  @IsNumber()
  attempts: number;
}
