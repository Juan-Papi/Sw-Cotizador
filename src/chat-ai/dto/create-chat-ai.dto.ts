import { IsNumber } from 'class-validator';

export class CreateChatAiDto {
  @IsNumber()
  occupied: number;
}
