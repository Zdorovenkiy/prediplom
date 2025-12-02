import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { OrderProductsModule } from './order_products/order_products.module';
import { OrdersModule } from './orders/orders.module';
import { ProductImagesModule } from './product_images/product_images.module';
import { ProductsModule } from './products/products.module';
import { ReviewResponsesModule } from './review_responses/review_responses.module';
import { ReviewsModule } from './reviews/reviews.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [UsersModule, FilesModule, OrderProductsModule, OrdersModule, ProductImagesModule, ProductsModule, ReviewResponsesModule, ReviewsModule, RolesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
