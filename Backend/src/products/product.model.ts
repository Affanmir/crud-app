import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category:{type: String, required: true},
  img:{type: String, required: true},
});

export interface Product extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  img: string;
}
