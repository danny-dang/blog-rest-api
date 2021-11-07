import { delay } from "../../utils"
import { v4 as uuidv4 } from 'uuid';

export const getBlogs = async () => {
  await delay(1000)
  return global.blogs.map(i => ({
    id: i?.id,
    createdAt: i?.createdAt,
    title: i?.title,
  })) || []
}

export const getBlogById = async (id) => {
  await delay(1000)
  let blog = global.blogs?.find(i => i.id === id)
  return blog || null
}

export const createBlog = async (payload) => {
  await delay(1000)
  let newId = uuidv4()
  let newBlog = {
    id: newId,
    createdAt: new Date().getTime(),
    ...payload
  }
  global.blogs?.push(newBlog)
  return newBlog
}

export const editBlogById = async (id, payload) => {
  await delay(1000)
  let blogIndex = global.blogs?.findIndex(i => i.id === id)
  if (blogIndex === -1) {
    return null
  }

  global.blogs[blogIndex] = {
    id: global.blogs[blogIndex].id,
    createdAt: global.blogs[blogIndex].createdAt,
    ...payload
  }
  return global.blogs[blogIndex]
}

export const deleteBlogById = async (id) => {
  await delay(1000)
  let blogIndex = global.blogs?.findIndex(i => i.id === id)
  if (blogIndex === -1) {
    return null
  }
  global.blogs = global.blogs?.filter(i => i.id !== id)
  return true
}