const {Router} = require('express')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const User =  require("../models/User")
const router = Router()


console.log("start auth")


// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Email is incorrect').isEmail(),
    check('password', 'Password is incorrect. Length must be more then 6').isLength({min: 6})
  ],
  async (req, res, next) => {
    console.log("server register")
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Incorrect registration data"
      })
    }
    try {
      const {email, password} = req.body

      const candidate = await User.findOne({email})
      if(candidate) {
        return res.status(400).json({message: "User already exist"})
      }

      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({
        email,
        password: hashedPassword
      })
      await user.save()

      res.status(201).json({message: "User was created"})


    } catch (err) {
      res.status(500).json({message: err.message})
    
    }
    next()
})
// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Input correct email').normalizeEmail().isEmail(),
    check('password', 'Input correct password. It length must be more then 6').exists().isLength({min: 6})
  ],
  async (req, res, next) => {
    console.log("server login")
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Incorrect login data"
      })
    }
    console.log("Validation OK")
    try {
      const {email, password} = req.body

      const user = await User.findOne({email})
      if(!user) {
        return res.status(400).json({message: "There is no such user"})
      }

      // TODO: add salt to bd 
      const isPswdCorrect = bcrypt.compare(password, user.password)
      console.log(isPswdCorrect)

      if (!isPswdCorrect) {
        res.status(400).json("Incorrect password. Please, try it again")
      }

      const token = jwt.sign(
        {userId: user._id},
        process.env.jwt_Secret,
        {expiresIn: '1h'}
      )

      res.json({token, userId: user._id})
      
    } catch (err) {
      // res.status(500).json({message: "Uncorrect data"})
      res.status(500).json({message: err.message})
    }
    next()
})
console.log("endauth")


module.exports = router