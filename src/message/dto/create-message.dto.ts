import {
    IsString,
    IsOptional,
     Matches
  } from 'class-validator';
  

export class CreateMessageDto {
    @IsString()
    message: string;

    @IsOptional() // Si quieres que el campo sea opcional
    @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/, {
      message: 'time must be in HH:mm:ss format',
    })
    date?: string;

    @IsString()
    emisor?: string;

    @IsString()
   receptor?: string;

}