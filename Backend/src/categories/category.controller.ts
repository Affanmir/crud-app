
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Req,
  Res,
  UseInterceptors,
  UploadedFile,
  Header,
} from '@nestjs/common';
var fs = require('fs');

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}


import { CategoryService } from './category.service';

import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';


@Controller('category')

export class CategoryController {
  constructor(private readonly CategoryService: CategoryService) {}

  @Post()
  @Header("Access-Control-Allow-Origin", "*")
  @Header("Content-Type", "multipart/form-data")
  @UseInterceptors(FileInterceptor('image'))
  async addCategory(
    @Body('title') catTitle: string,
    @Body('img') catImg: string,
    @UploadedFile() catImage: any
  ) {

  var temp = catImage.buffer.toString('base64');
    const generatedId = await this.CategoryService.insertCategory(
      catTitle,
      catImg,
      temp,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllCategory() {
    const category = await this.CategoryService.getCategorys();
    return category;
  }

  @Get(':id')
  getCategory(@Param('id') catId: string) {
    return this.CategoryService.getSingleCategory(catId);
  }


  @Patch(':id')
  @Header("Access-Control-Allow-Origin", "*")
  @Header("Content-Type", "multipart/form-data")
  @UseInterceptors(FileInterceptor('image'))
  async updateCategory(
    @Param('id') catId: string,
    @Body('title') catTitle: string,
    @Body('img') catImg: string,
    @UploadedFile() catImage:any
  ) {
    var temp = catImage.buffer.toString('base64');
    await this.CategoryService.updateCategory(catId, catTitle, catImg ,temp);
    return null;
  }

  @Delete(':id')
  async removeCategory(@Param('id') catId: string) {
      await this.CategoryService.deleteCategory(catId);
      return null;
  }
}
