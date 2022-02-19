import { baseResponse } from '../../utils'
import {
  getBlogs,
  getBlogById,
  createBlog,
  editBlogById,
  deleteBlogById
} from './services'

export const handleGetBlogs = async (req, res) => {
  let result = await getBlogs() || []
  return res.json(baseResponse('Get blogs successfully', result))
}

export const handleGetBlogById = async (req, res) => {
  let { id } = req.params
  let result = await getBlogById(id)
  if (!result) {
    return res.status(404).send({
      message: `Blog ${id} not found`,
    })
  }
  return res.json(baseResponse('Get blog by id successfully', result))
}

export const handleCreateBlog = async (req, res) => {
  let user = req.user
  let { title, content } = req.body

  if (!title) {
    return res.status(400).send({
      message: `title is missing`,
    })
  }

  if (!content) {
    return res.status(400).send({
      message: `content is missing`,
    })
  }

  let result = await createBlog({ title, content, author: user.id })
  if (!result) {
    return res.status(500).send({
      message: `Error creating blog, try again later`,
    })
  }
  return res.json(baseResponse('New blog created', result))
}

export const handleEditBlogById = async (req, res) => {
  let user = req.user
  let { id } = req.params
  let { title, content } = req.body
  if (!title) {
    return res.status(400).send({
      message: `title is missing`,
    })
  }

  if (!content) {
    return res.status(400).send({
      message: `content is missing`,
    })
  }

  let blog = await getBlogById(id)

  if (blog) {
    if (blog.author !== user.id) {
      return res.status(403).send({
        message: `You are not the owner of this blog: ${id}`,
      })
    }
  }

  let result = await editBlogById(id, { title, content })
  if (!result) {
    return res.status(404).send({
      message: `Blog ${id} not found`,
    })
  }
  return res.json(baseResponse(`Blog ${id} edited`, result))
}

export const handleDeleteBlogById = async (req, res) => {
  let { id } = req.params
  let user = req.user

  let blog = await getBlogById(id)
  if (blog) {
    if (!(blog.author === user.id || user.role === 'admin')) {
      return res.status(403).send({
        message: `You are not the owner of this blog: ${id}, or admin`,
      })
    }
  }

  let result = deleteBlogById(id)
  if (!result) {
    return res.status(404).send({
      message: `Blog ${id} not found`,
    })
  }
  return res.json(baseResponse(`Blog ${id} deleted`, true))
}