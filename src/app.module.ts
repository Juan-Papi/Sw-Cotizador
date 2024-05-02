import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ProfileModule } from './profile/profile.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { MembershipModule } from './membership/membership.module';
import { BuyMembershipModule } from './buy-membership/buy-membership.module';
import { CurrencyModule } from './currency/currency.module';
import { ChatStockModule } from './chat-stock/chat-stock.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true, //talvez no convenga que esté en true en produccion
      //porque en produccion mas que todo modificamos con migraciones, esto 
      //podemos manejar tambien con variables de entorno
    }),
    AuthModule,
    CommonModule,
    SeedModule,
    ProfileModule,
    CloudinaryModule,
    MembershipModule,
    BuyMembershipModule,
    CurrencyModule,
    ChatStockModule,
  ],
})
export class AppModule {}
