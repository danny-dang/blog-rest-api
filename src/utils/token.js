import jwt from 'jsonwebtoken'
import config from '../config'

export const getBearerToken = (authHeader) => {
  authHeader = authHeader.split(' ')
  return authHeader?.[1]
}

export const signToken = (user) => {
  const token = jwt.sign({
    id: user.id,
    email: user.email
  }, config.jwtKey);

  return token
}

export const verifyToken = (token) => {

  if (token) {
    let decoded = jwt.verify(token, config.jwtKey);
    if (decoded) {
      return decoded
    }
  }
  return false
}