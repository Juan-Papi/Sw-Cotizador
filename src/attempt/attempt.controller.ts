import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { AttemptService } from './attempt.service';
import { CreateAttemptDto } from './dto/create-attempt.dto';
import { UpdateAttemptDto } from './dto/update-attempt.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('attempt')
@Controller('attempt')
export class AttemptController {
  constructor(private readonly attemptService: AttemptService) {}

  @Post()
  create(@Body() createAttemptDto: CreateAttemptDto) {
    return this.attemptService.create(createAttemptDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attemptService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAttemptDto: UpdateAttemptDto) {
  //   return this.attemptService.update(+id, updateAttemptDto);
  // }
}
