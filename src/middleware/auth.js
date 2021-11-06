import { getBearerToken, verifyToken } from "../utils/token"

export const isUserAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(403).json({
      status: 403,
      message: 'FORBIDDEN'
    })
  } else {
    const token = getBearerToken(authHeader)

    if (token) {
      let user = verifyToken(token)

      if (!user) {
        return res.status(401).json({
          status: 401,
          message: 'TOKEN UNAUTHORIZED'
        })
      }

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