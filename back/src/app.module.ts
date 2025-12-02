import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { FilesModule } from './modules/files/files.module';
import { OrderProductsModule } from './modules/order_products/order_products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ProductImagesModule } from './modules/product_images/product_images.module';
import { ProductsModule } from './modules/products/products.module';
import { ReviewResponsesModule } from './modules/review_responses/review_responses.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { RolesModule } from './modules/roles/roles.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Tables from './models/index';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UsersModule, 
    FilesModule, 
    OrderProductsModule, 
    OrdersModule, 
    ProductImagesModule, 
    ProductsModule, 
    ReviewResponsesModule, 
    ReviewsModule, 
    RolesModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [...Object.values(Tables)],
      autoLoadModels: true,
      synchronize: true,
      logging: false
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
