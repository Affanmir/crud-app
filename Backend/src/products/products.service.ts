import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(title: string, desc: string, price: number, category: string, img: string, image:string) {
    const newProduct = new this.productModel({
      title,
      description: desc,
      price,
      category,
      img,
      image,
      
    });
    const result = await newProduct.save();
    return result.id as string;
  }

  async getProducts() {
    const products = await this.productModel.find().exec();
    return products.map(prod => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price,
      category: prod.category,
      img: prod.img,
      image: prod.image
    }));
  }

  async getSingleProduct(productId: string) {
    const product = await this.findProduct(productId);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      img: product.img,
      image: product.image
    };
  }

  async updateProduct(
    productId: string,
    title: string,
    desc: string,
    price: number,
    category: string,
    img: string,
    image:string,
  ) {
    const updatedProduct = await this.findProduct(productId);
    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.description = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }
    if (category){
      updatedProduct.category = category;
    }
    if (img){
      updatedProduct.img = img;
    }
    if (image){
      updatedProduct.image = image;
    }
    updatedProduct.save();
  }

  async deleteProduct(prodId: string) {
    const result = await this.productModel.deleteOne({_id: prodId}).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find product.');
    }
  }

  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find product.');
    }
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return product;
  }
}
