import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './categories/category.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ProductsModule,CategoryModule,
    MongooseModule.forRoot(
      'mongodb+srv://affanmir:ok@cluster0.98nopec.mongodb.net/nestjs-practice?retryWrites=true&w=majority',{ useNewUrlParser: true }
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
