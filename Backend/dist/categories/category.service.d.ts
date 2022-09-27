import { Model } from 'mongoose';
import { Category } from './category.model';
export declare class CategoryService {
    private readonly categoryModel;
    constructor(categoryModel: Model<Category>);
    insertCategory(title: string, img: string): Promise<string>;
    getCategorys(): Promise<{
        id: string;
        title: string;
        img: string;
    }[]>;
    getSingleCategory(categoryId: string): Promise<{
        id: string;
        title: string;
        img: string;
    }>;
    updateCategory(categoryId: string, title: string, img: string): Promise<void>;
    deleteCategory(prodId: string): Promise<void>;
    private findCategory;
}
