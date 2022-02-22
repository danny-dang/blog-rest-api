import { getUserById } from "../controllers/user/services"
import { getBearerToken, verifyToken } from "../utils/token"

export const isUserAuthenticated = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(403).json({
      status: 403,
      message: 'FORBIDDEN'
    })
  } else {
    const token = getBearerToken(authHeader)

    if (token) {
      let user
      try {
        user = verifyToken(token)
        if (!user) {
          throw ''
        }
      } catch (e) {
        return res.status(401).json({
          status: 401,
          message: 'TOKEN UNAUTHORIZED'
        })
      }

      user = await getUserById(user.id)

      req.user = user
      next()
    } else {
      return res.status(403).json({
        status: 403,
        message: 'FORBIDDEN'
      })
    }
  }
}

export const isAdmin = async (req, res, next) => {
  const user = req.user
  if (user.role === 'admin') {
    next()
  } else {
    return res.status(403).json({
      status: 403,
      message: 'FORBIDDEN. Admin only'
    })
  }
}