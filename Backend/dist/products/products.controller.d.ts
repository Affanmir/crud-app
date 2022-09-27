import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    addProduct(prodTitle: string, prodDesc: string, prodPrice: number, prodCategory: string, prodImg: string): Promise<{
        id: string;
    }>;
    getAllProducts(): Promise<{
        id: string;
        title: string;
        description: string;
        price: number;
        category: string;
        img: string;
    }[]>;
    getProduct(prodId: string): Promise<{
        id: string;
        title: string;
        description: string;
        price: number;
        category: string;
        img: string;
    }>;
    updateProduct(prodId: string, prodTitle: string, prodDesc: string, prodPrice: number, prodCategory: string, prodImg: string): Promise<any>;
    removeProduct(prodId: string): Promise<any>;
}
