import config from '../../config'
import { baseResponse, cleanSecretFields, comparePassword, signToken } from '../../utils'
import {
  getUserByUsername,
  createUser,
  getUserById,
  getUsers
} from "./services"

export const handleLogin = async (req, res) => {
  let { username, password } = req.body

  try {
    let user = await getUserByUsername(username)

    if (user === undefined) {
      return res.status(401).send({
        statusCode: 401,
        message: 'username or password is incorrect',
      })
    }

    const isValid = await comparePassword(password, user.password)

    if (!isValid) {
      return res.status(401).send({
        statusCode: 401,
        message: 'username or password is incorrect',
      })
    }

    const token = signToken(user)

    const result = {
      token: token,
      user: cleanSecretFields(user)
    }
    return res.json(baseResponse('Login successfully', result))

  } catch (error) {
    console.log(error)
    return res.status(400).send({
      statusCode: 400,
      message: 'Bad Request',
    })
  }
}

export const handleRegister = async (req, res) => {
  let { username, password, name } = req.body

  try {
    let existedUser = await getUserByUsername(username)

    if (existedUser) {
      return res.status(400).send({
        statusCode: 400,
        message: 'username existed. Please use another one.',
      })
    }

    let newUser = await createUser({
      username,
      password,
      name,
      role: 'user'
    })

    if (!newUser) {
      return res.status(500).send({
        statusCode: 500,
        message: 'User not created, server error.',
      })
    }

    const data = {
      token: signToken(newUser),
      user: cleanSecretFields(newUser)
    }

    return res.json(baseResponse('Register successfully', data))

  } catch (error) {
    console.log(error)
    return res.status(400).send({
      statusCode: 400,
      message: 'Bad Request',
    })
  }
}

export const getProfile = async (req, res) => {
  let { id } = req.user

  let user = await getUserById(id)

  if (!user) {
    return res.status(404).send({
      message: 'No user found',
    })
  }

  return res.json(baseResponse('Get profile successfully', { user: cleanSecretFields(user) }))
}

export const handleGetAllUsers = async (req, res) => {
  let users = await getUsers()
  const data = {
    users: users.map(i => ({
      ...i,
      password: ''
    }))
  }
  return res.json(baseResponse('Get all users successfully', data))
}