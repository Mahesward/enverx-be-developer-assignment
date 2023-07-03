import { Router } from 'express';
import * as controller from '../controllers/blog';
const router: Router = Router();

router.route('/').get(controller.getAllBlogs).post(controller.addNewBlog);

export default router;
