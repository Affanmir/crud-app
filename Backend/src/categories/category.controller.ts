import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly CategoryService: CategoryService) {}

  @Post()
  async addCategory(
    @Body('title') catTitle: string,

  ) {
    const generatedId = await this.CategoryService.insertCategory(
      catTitle,
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
  async updateCategory(
    @Param('id') catId: string,
    @Body('title') catTitle: string,
  ) {
    await this.CategoryService.updateCategory(catId, catTitle );
    return null;
  }

  @Delete(':id')
  async removeCategory(@Param('id') catId: string) {
      await this.CategoryService.deleteCategory(catId);
      return null;
  }
}
