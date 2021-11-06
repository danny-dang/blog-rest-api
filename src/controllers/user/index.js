import config from '../../config'
import { baseResponse, cleanSecretFields, comparePassword, signToken } from '../../utils'
import {
  getUserByEmail,
  createUser,
  getUserById
} from "./services"

export const handleLogin = async (req, res) => {
  let { email, password } = req.body

  try {
    let user = await getUserByEmail(email)

    if (user === undefined) {
      return res.status(401).send({
        statusCode: 401,
        message: 'Email or password is incorrect',
      })
    }

    const isValid = await comparePassword(password, user.password)

    if (!isValid) {
      return res.status(401).send({
        statusCode: 401,
        message: 'Email or password is incorrect',
      })
    }

    const token = signToken(user)

    if (user?.subscriptions) {
      user.subscriptions = user?.subscriptions.filter(i => i.environment === config.environment)
    }
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
  let { email, password } = req.body

  try {
    let existedUser = await getUserByEmail(email)

    if (existedUser) {
      return res.status(400).send({
        statusCode: 400,
        message: 'Email existed. Please use another one.',
      })
    }

    let newUser = await createUser(email, password)

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
