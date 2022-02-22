
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

  /** 
   * @swagger 
   * /blogs: 
   *   get: 
   *     tags:
   *     - "blogs"
   *     description: Get all blogs 
   *     responses:  
   *       200: 
   *         description: Success  
   *   
   */
  router.get('/', handleGetBlogs)

  /** 
   * @swagger 
   * /blogs/{id}: 
   *   get: 
   *     tags:
   *     - "blogs"
   *     parameters:
   *     - name: "id"
   *       in: "path"
   *       description: "ID of blog to return"
   *       required: true
   *       type: "string"
   *     description: Get Blog by id 
   *     responses:  
   *       200: 
   *         description: Success  
   *   
   */
  router.get('/:id', handleGetBlogById)

  /** 
   * @swagger 
   * /blogs: 
   *   post: 
   *     tags:
   *     - "blogs"
   *     parameters:
   *     - name: "title"
   *       in: "body"
   *       description: "title of the blog"
   *       required: true
   *       type: "string"
   *     - name: "content"
   *       in: "body"
   *       description: "content of the blog"
   *       required: true
   *       type: "string"
   *     description: Create a new blog
   *     responses:  
   *       200: 
   *         description: Success  
   *     security:
   *     - authorization: []
   */
  router.post('/', isUserAuthenticated, handleCreateBlog)

  /** 
   * @swagger 
   * /blogs/{id}: 
   *   put: 
   *     tags:
   *     - "blogs"
   *     parameters:
   *     - name: "id"
   *       in: "path"
   *       description: "id of the blog"
   *       required: true
   *       type: "string"
   *     - name: "title"
   *       in: "body"
   *       description: "title of the blog"
   *       required: true
   *       type: "string"
   *     - name: "content"
   *       in: "body"
   *       description: "content of the blog"
   *       required: true
   *       type: "string"
   *     description: Create a new blog
   *     responses:  
   *       200: 
   *         description: Success  
   *     security:
   *     - authorization: []
   */
  router.put('/:id', isUserAuthenticated, handleEditBlogById)

  /** 
   * @swagger 
   * /blogs/{id}: 
   *   delete: 
   *     tags:
   *     - "blogs"
   *     parameters:
   *     - name: "id"
   *       in: "path"
   *       description: "ID of blog to delete"
   *       required: true
   *       type: "string"
   *     description: Delete Blog by id 
   *     responses:  
   *       200: 
   *         description: Success  
   *     security:
   *     - authorization: []
   */
  router.delete('/:id', isUserAuthenticated, handleDeleteBlogById)
};
