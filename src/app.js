import dotenv from 'dotenv'
dotenv.config({});
import express, { json } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import restRouter from './routes'
import blogs from './db/blogs'
import users from './db/users'

global.blogs = blogs
global.users = users

console.log('Database connected')

const app = express()

// configuration stuff first
app.use(json({ limit: '2mb' }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(
  cors({
    origin: "*",
    credentials: false,
    methods: ['DELETE', 'GET', 'POST', 'PUT'],
    optionsSuccessStatus: 200,
    exposedHeaders: ['Authorization'],
  }),
)

restRouter(app);

app.use('/', (req, res) => {
  res.send('Welcome to Blog Rest API')
});

// errors & edge cases
app.use((err, req, res, _) => {
  res.status(err.status || 500)
  res.json({
    err: {
      message: err.message,
    },
  })
})

app.use((req, res, next) => {
  const error = new Error('Route Not Found')
  error.message = '404'
  next(error)
  return res.status(404).send({
    message: 'Route Not Found',
  })
})

export default app