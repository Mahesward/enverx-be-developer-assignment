import Joi from 'joi';

export const blogSchema = Joi.object({
  author: Joi.string()
             .min(3)
             .max(15)
             .required()
             .trim(),

  title: Joi.string()
            .min(3)
            .max(20)
            .required()
            .trim(),
            
  content: Joi.string()
            .min(3)
            .max(2000)
            .required()
            .trim(),
});