require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const auth = require('./routes/auth.routes')
const link = require('./routes/link.routes')
const test = require('./routes/redirect.routes')
const path = require('path')
var cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json({extended: true}))

app.use('/api/auth', auth)
app.use('/api/link', link)
app.use('/t', test)

if (process.env.NODE_ENV === 'production') {
  app.use('/'. express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 3001
const uri = process.env.MONGO_DB_URI || ""


async function start () {

  try {
    await mongoose.connect(uri, {

    })
    app.listen(PORT, console.log(`App started on port:${PORT}`))
    
  } catch (err) {
    console.log('Server error::: ', err.message)
    process.exit(1)
  }

}

start()
