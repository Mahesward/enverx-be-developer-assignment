import { Request, Response } from 'express';
import { blogSchema } from '../helpers/validations/blogValidationSchama';
import Blog from '../models/blogSchema';
import { IBlog } from '../models/types/blogTypes';
import mongoose from 'mongoose';

//* get-all-blogs

export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    //* getting all blog from db
    const data = await Blog.find({});
    return res.status(200).send({ success: true, message: 'get all blogs successfull', data });
  } catch (error) {
    return res.status(500).send({
      succes: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

//* add-new-blog

export const addNewBlog = async (req: Request, res: Response) => {
  try {
    //* Validating Blog with JOI
    const isBlogValid: IBlog = await blogSchema.validateAsync({
      author: req.body.author,
      title: req.body.title,
      content: req.body.content,
    });

    //* validating if the blog already exists

    const isBlogExist = await Blog.findOne(isBlogValid);

    if (isBlogExist) return res.status(409).send({ success: false, message: 'blog already exists' });

    //* adding blog to db

    await Blog.insertMany(isBlogValid);
    return res.status(200).send({ success: true, message: 'add new blogs successfull' });
  } catch (error) {
    return res.status(500).send({
      succes: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

//* get-blog-by-Id

export const getBlogById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    //* validating the Id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(200).send({ success: false, message: 'Invalid ObjectId' });
    }

    //* checking if the blog exists

    const data = await Blog.findById(id);

    if (!data) return res.status(404).send({ success: false, message: 'blog not found', data });

    return res.status(200).send({ success: true, message: 'get blog successfull', data });
  } catch (error) {
    return res.status(500).send({
      succes: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

//* edit-blog

export const editBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    //* validating the Id

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(200).send({ success: false, message: 'Invalid ObjectId' });
    }

    //* checking if the blog exists

    const isBlogExist = await Blog.findById(id);

    if (!isBlogExist) return res.status(404).send({ success: false, message: 'blog not found' });

    //* Validating Blog with JOI
    const isBlogValid: IBlog = await blogSchema.validateAsync({
      author: req.body.author,
      title: req.body.title,
      content: req.body.content,
    });

    const { author, title, content }: IBlog = isBlogValid;

    await Blog.updateOne({ _id: id }, { author, title, content });

    return res.status(200).send({ success: true, message: 'blog updated successfully' });
  } catch (error) {
    return res.status(500).send({
      succes: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

//* edit-blog

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    //* validating the Id

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(200).send({ success: false, message: 'Invalid ObjectId' });
    }

    //* checking if the blog exists

    const isBlogExist = await Blog.findById(id);

    if (!isBlogExist) return res.status(404).send({ success: false, message: 'blog not found' });

    await Blog.deleteOne({ _id: id });

    return res.status(200).send({ success: true, message: 'blog deleted successfully' });
  } catch (error) {
    return res.status(500).send({
      succes: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};
