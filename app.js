require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const auth = require('./routes/auth.routes')

const app = express()

app.use('/api/auth', auth)


const PORT = process.env.PORT || 3000
const uri = process.env.MONGO_DB_URI || ""



app.use('/api/auth', auth)


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
