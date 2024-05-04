import { IsNumber } from 'class-validator';

export class CreateChatAiDto {
  @IsNumber()
  numberAttempts: number;

  @IsNumber()
  occupied: number;
}
