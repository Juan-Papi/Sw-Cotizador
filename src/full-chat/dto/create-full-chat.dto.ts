import { IsString } from 'class-validator';

export class CreateFullChatDto {
  @IsString()
  name: string;
}
