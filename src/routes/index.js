import express from 'express'
// import userRouter from './user'
import blogsRouter from './blogs'

const router = express.Router()
export default (app) => {
  app.use('/api', router);
  blogsRouter(router)
}

