import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseInterceptors,
  Header,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Header("Access-Control-Allow-Origin", "*")
  @Header("Content-Type", "multipart/form-data")
  @UseInterceptors(FileInterceptor('image'))
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
    @Body('category') prodCategory: string,
    @Body('img') prodImg: string,
    @UploadedFile() prodImage:any
  ) {
    console.log(prodImage);
    var temp = prodImage.buffer.toString('base64');
    const generatedId = await this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
      prodCategory,
      prodImg,
      temp,

    );
    return { id: generatedId };
  }

  @Get()
  async getAllProducts() {
    const products = await this.productsService.getProducts();
    return products;
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getSingleProduct(prodId);
  }

  @Patch(':id')
  @Header("Access-Control-Allow-Origin", "*")
  @Header("Content-Type", "multipart/form-data")
  @UseInterceptors(FileInterceptor('image'))
  async updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
    @Body('category') prodCategory: string,
    @Body('img') prodImg:string,
    @UploadedFile() prodImage:any
  ) {
    var temp = prodImage.buffer.toString('base64');
    await this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice, prodCategory,prodImg,temp);
    return null;
  }

  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
      await this.productsService.deleteProduct(prodId);
      return null;
  }
}
