const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')

//Import Routes
const sauceRoutes = require('./routes/sauce')
const userRoutes = require('./routes/user')

//MONGOOSE
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_COLLECTION}?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))

const app = express()

//HEADERS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})

//Parse Request
app.use(bodyParser.json())

//Serving images
app.use('/images', express.static(path.join(__dirname, 'images')))

//Defining Routes
app.use('/api/sauces', sauceRoutes)
app.use('/api/auth', userRoutes)

module.exports = app
