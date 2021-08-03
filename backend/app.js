require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const helmet = require("helmet")

//Import Routes
const sauceRoutes = require('./routes/sauceRoute')
const userRoutes = require('./routes/userRoute')

//MONGOOSE
mongoose.connect(`${process.env.DB_HOST}://${process.env.DB_USER}:${process.env.DB_USER_PASS}@${process.env.DB_CLUSTER}/${process.env.DB_COLLECTION}?retryWrites=true&w=majority`,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))

const app = express()

//Cors
let corsOptions = {origin: `${process.env.CORS_ORIGIN}`}
app.use(cors({corsOptions}))

//Headers
app.use(helmet())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})

//Parse Request
app.use(express.json())


//Serving images
app.use('/images', express.static(path.join(__dirname, 'images')))

//Defining Routes
app.use('/api/sauces', sauceRoutes)
app.use('/api/auth', userRoutes)

module.exports = app
