import { Request, Response } from 'express';
import { blogSchema } from '../helpers/validations/blogValidationSchama';
import Blog from '../models/blogSchema';
import { IBlog } from '../models/types/blogTypes';

//* get-all-blogs

export const getAllBlogs = async (req: Request, res: Response) => {
  try {
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

    const { author, title, content } = req.body;

    //*

    const isBlogExist = await Blog.findOne({ author, title, content });

    if (isBlogExist) return res.status(409).send({ success: false, message: 'blog already exists' });

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
