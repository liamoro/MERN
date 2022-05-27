require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const auth = require('./routes/auth.routes')
const link = require('./routes/link.routes')
var cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json({extended: true}))

app.use('/api/auth', auth)
app.use('/api/link', link)

// app.get('/', function(req, res) {
//   res.send('hello world');
// });


const PORT = process.env.PORT || 3001
const uri = process.env.MONGO_DB_URI || ""



// app.use('/', (req, res) => {
//   return res.json("loaded")
// })



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
