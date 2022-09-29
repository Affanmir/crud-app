import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Category } from './category.model';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async insertCategory(title: string,img: string,image:string ) {
  
    const newCategory = new this.categoryModel({
      title,
      img,
      image,
    });
    const result = await newCategory.save();
    return result.id as string;
  }

  async getCategorys() {
    const categorys = await this.categoryModel.find().exec();
    return categorys.map(prod => ({
      id: prod.id,
      title: prod.title,
      img: prod.img,
      image: prod.image
    }));
  }

  async getSingleCategory(categoryId: string) {
    const category = await this.findCategory(categoryId);
    return {
      id: category.id,
      title: category.title,
      img: category.img,
    };
  }

  async updateCategory(
    categoryId: string,
    title: string,
    img: string,
    image: string
  ) {
    const updatedCategory = await this.findCategory(categoryId);
    if (title) {
      updatedCategory.title = title;
    }
    if (img) {
      updatedCategory.img = img;
    }
    if (image) {
      updatedCategory.image = image;
    }
    updatedCategory.save();
  }

  async deleteCategory(prodId: string) {
    const result = await this.categoryModel.deleteOne({_id: prodId}).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find category.');
    }
  }

  private async findCategory(id: string): Promise<Category> {
    let category;
    try {
      category = await this.categoryModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find category.');
    }
    if (!category) {
      throw new NotFoundException('Could not find category.');
    }
    return category;
  }
}
