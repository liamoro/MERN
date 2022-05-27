const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
  if (req.method == 'OPTIONS') return next()

  try {
    const token = req.header.authorization.split(' ')[1] // 'Bearer token'
    if (!token) {
      return res.status(401).json({message: 'User is not authorized!'})
    }
    const decoded = jwt.verify(token, process.env.jwt_Secret)
    req.user = decoded
    next()

  } catch (error) {
    res.status(401).json({message: 'User is not authorized!'})
  }
}