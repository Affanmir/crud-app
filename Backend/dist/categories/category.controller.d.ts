/// <reference types="multer" />
import { CategoryService } from './category.service';
export declare class CategoryController {
    private readonly CategoryService;
    constructor(CategoryService: CategoryService);
    addCategory(catTitle: string, catImg: string, catImage: Express.Multer.File): Promise<{
        id: string;
    }>;
    getAllCategory(): Promise<{
        id: string;
        title: string;
        img: string;
    }[]>;
    getCategory(catId: string): Promise<{
        id: string;
        title: string;
        img: string;
    }>;
    updateCategory(catId: string, catTitle: string, catImg: string): Promise<any>;
    removeCategory(catId: string): Promise<any>;
}
