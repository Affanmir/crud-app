import { Model } from 'mongoose';
import { Product } from './product.model';
export declare class ProductsService {
    private readonly productModel;
    constructor(productModel: Model<Product>);
    insertProduct(title: string, desc: string, price: number, category: string, img: string): Promise<string>;
    getProducts(): Promise<{
        id: string;
        title: string;
        description: string;
        price: number;
        category: string;
        img: string;
    }[]>;
    getSingleProduct(productId: string): Promise<{
        id: string;
        title: string;
        description: string;
        price: number;
        category: string;
        img: string;
    }>;
    updateProduct(productId: string, title: string, desc: string, price: number, category: string, img: string): Promise<void>;
    deleteProduct(prodId: string): Promise<void>;
    private findProduct;
}
