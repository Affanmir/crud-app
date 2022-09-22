import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
  title: { type: String, required: true },

});

export interface Category extends mongoose.Document {
  id: string;
  title: string;

}
