
import express from 'express';
import {
    handleGetBlogs,
    handleGetBlogById,
    handleCreateBlog,
    handleEditBlogById,
    handleDeleteBlogById
} from '../controllers/blogs'

const router = express.Router();
export default (app) => {
    app.use('/blogs', router);
    router.get('/', handleGetBlogs)
    router.get('/:id', handleGetBlogById)
    router.post('/', handleCreateBlog)
    router.put('/:id', handleEditBlogById)
    router.delete('/:id', handleDeleteBlogById)
};