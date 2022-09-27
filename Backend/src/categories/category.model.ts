import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  img: {type: String, required: true},
  image:{type: String, required:true }

});

export interface Category extends mongoose.Document {
  id: string;
  title: string;
  img: string;
  image: string;

}
