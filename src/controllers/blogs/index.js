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

  let result = await createBlog({ title, content })
  if (!result) {
    return res.status(500).send({
      message: `Error creating blog, try again later`,
    })
  }
  return res.json(baseResponse('New blog created', result))
}

export const handleEditBlogById = async (req, res) => {
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
  let result = deleteBlogById(id)
  if (!result) {
    return res.status(404).send({
      message: `Blog ${id} not found`,
    })
  }
  return res.json(baseResponse(`Blog ${id} deleted`, true))
}