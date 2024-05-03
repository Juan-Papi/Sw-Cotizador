import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BuyMembershipService } from './buy-membership.service';
import { CreateBuyMembershipDto } from './dto/create-buy-membership.dto';
import { UpdateBuyMembershipDto } from './dto/update-buy-membership.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { ApiTags } from '@nestjs/swagger';
import { CreateBuyPaypalDto } from './dto/create-buy-paypal.dto';

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

  @Post('paid/create-paypal-order')
  //@Auth()
  async createPaypalOrder(@Body() cart: CreateBuyPaypalDto) {
    try {
      const { jsonResponse, httpStatusCode } =
        await this.buyMembershipService.createOrder(cart);
      return { data: jsonResponse, statusCode: httpStatusCode }; // Devuelve la respuesta en formato JSON
    } catch (error) {
      console.error('Failed to create order:', error);
      throw new HttpException(
        'Failed to create order.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
