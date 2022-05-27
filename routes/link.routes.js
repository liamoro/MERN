const Router = require('express')
const Link = require('../models/Link')
const shortid = require('shortid')
const auth = require('../middleware/auth.middleware')
require('dotenv').config()
const router = Router()


router.post('/generate', auth, async (req, res) => {
  try {
    const {from} = req.body
    const code = shortid.generate()
    const existing = Link.findOne({ from })
    if (existing) {
      return res.json({link: existing})
    }
    const to = process.env.baseUrl + '/t/' + code

    const link = new Link({
      code, to, from, owner: req.user.userId
    })
    await link.save()
    res.status(201).json({link})
    
  } catch (error) {
    res.status(500).json({message: err.message})
  }
})

// get all links
router.get('/', auth,  async (req, res) => {
  try {
    const links = Link.find({owner: req.user.userId}) ///???
    res.json(links)
  } catch (error) {
    res.status(500).json({message: err.message})
  }
})

// get special link
router.get('/:id', auth, async (req, res) => {
  try {
    const link = Link.findById(req.params.id)
    res.json(link)
  } catch (error) {
    res.status(500).json({message: err.message})
  }
})



module.exports = router