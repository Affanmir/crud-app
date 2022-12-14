import * as mongoose from 'mongoose';
export declare const ProductSchema: mongoose.Schema<any>;
export interface Product extends mongoose.Document {
    id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    img: string;
}
