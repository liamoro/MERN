const jwt = require('jsonwebtoken')
require('dotenv').config()

console.log("Hello auth")

module.exports = (req, res, next) => {
  if (req.method == 'OPTIONS') return next()

  try {

    const token = req.headers.authorization.split(' ')[1] // 'Bearer token'
    console.log(token)
    if (!token) {
      return res.status(401).json({message: 'User is not authorized!'})
    }
    

    const decoded = jwt.verify(token, process.env.jwt_Secret)
    req.user = decoded

    console.log(req.user)
    console.log("user authed!")
    next()

  } catch (error) {
    res.status(401).json({message: 'User is not authorized!'})
  }
}