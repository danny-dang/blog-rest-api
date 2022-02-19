import express from 'express'
// import userRouter from './user'
import blogsRouter from './blogs'
import usersRouter from './users'

const router = express.Router()
export default (app) => {
  app.use('/api', router);
  blogsRouter(router)
  usersRouter(router)
}

