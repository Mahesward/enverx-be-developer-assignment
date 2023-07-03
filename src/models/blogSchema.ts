import mongoose, { Document, Schema } from 'mongoose';
import { IBlog } from './types/blogTypes';

interface blogDocument extends IBlog, Document {}

const blogScema = new Schema<blogDocument>(
  {
    author: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      requied: true,
    },
  },
  {
    timestamps: true,
  }
);

const blogModel = mongoose.model<blogDocument>('Blog', blogScema);
export default blogModel;
