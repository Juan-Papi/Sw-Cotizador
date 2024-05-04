import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAttemptDto {
  @IsNumber()
  chatAiID: number;

  @IsOptional()
  @IsString()
  data: string;
}
