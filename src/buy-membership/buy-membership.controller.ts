import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BuyMembershipService } from './buy-membership.service';
import { CreateBuyMembershipDto } from './dto/create-buy-membership.dto';
import { UpdateBuyMembershipDto } from './dto/update-buy-membership.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../auth/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('BuyMembership')
@Controller('buy-membership')
export class BuyMembershipController {
  constructor(private readonly buyMembershipService: BuyMembershipService) {}

  @Post()
  @Auth()
  create(
    @Body() createBuyMembershipDto: CreateBuyMembershipDto,
    @GetUser('id') authUserId: string,
  ) {
    return this.buyMembershipService.create(createBuyMembershipDto, authUserId);
  }

  @Get()
  findAll() {
    return this.buyMembershipService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.buyMembershipService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBuyMembershipDto: UpdateBuyMembershipDto,
  ) {
    return this.buyMembershipService.update(+id, updateBuyMembershipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.buyMembershipService.remove(+id);
  }
}
