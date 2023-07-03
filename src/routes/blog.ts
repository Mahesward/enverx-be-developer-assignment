import { Router } from 'express';
import * as controller from '../controllers/blog';
const router: Router = Router();

router.route('/')
      .get(controller.getAllBlogs)
      .post(controller.addNewBlog);

router.route('/:id')
      .get(controller.getBlogById)
      .put(controller.editBlog)
      .delete(controller.deleteBlog)

export default router;
