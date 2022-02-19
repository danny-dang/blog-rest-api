
import express from 'express';
import {
  handleGetBlogs,
  handleGetBlogById,
  handleCreateBlog,
  handleEditBlogById,
  handleDeleteBlogById
} from '../controllers/blogs'
import { isUserAuthenticated } from '../middleware'

const router = express.Router();
export default (app) => {
  app.use('/blogs', router);
  router.get('/', handleGetBlogs)
  router.get('/:id', handleGetBlogById)
  router.post('/', isUserAuthenticated, handleCreateBlog)
  router.put('/:id', isUserAuthenticated, handleEditBlogById)
  router.delete('/:id', isUserAuthenticated, handleDeleteBlogById)
};