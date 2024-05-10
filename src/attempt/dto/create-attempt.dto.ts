import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAttemptDto {
  @IsNumber()
  chatAiID: number;

  @ApiProperty({ description: 'almacen los datos', nullable: true })
  @IsOptional()
  @IsString()
  data: string;
}
