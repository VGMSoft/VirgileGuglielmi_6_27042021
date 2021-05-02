const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const sauceRoutes = require('./routes/sauce')
const userRoutes = require('./routes/user')



const Sauce = require('./models/Sauce')

mongoose.connect('mongodb+srv://rootuser:uBe9Eb6u2ODRVowu@cluster0.vguj2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))

const app = express()

app.use('/api/sauce', sauceRoutes)
app.use('/api/auth', userRoutes)

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})

app.use(bodyParser.json())

//
app.post('/api/sauces', (req, res, next) => {
  delete req.body._id
  const thing = new Thing({
    ...req.body
  })
thing.save()
    .then(() => res.status(201).json({message: 'Sauce enregistrée !'}))
    .catch(error => res.status(400).json({error}))
})


app.get('/api/sauce', (req, res, next) => {
  Sauce.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));
})

app.get('/api/sauces', (req, res, next) => {
  const sauces = [
    {
      _id: 'oeihfzeoi',
      title: 'Ketchup',
      description: 'Les infos pour Ketchup',
      price: 49,
      userId: 'qsomihvqios',
    },
    {
      _id: 'oeihfzeomoihi',
      title: 'Mayonnaise',
      description: 'Les infos pour Mayonnaise',
      price: 29,
      userId: 'qsomihvqios',
    },
  ];
  res.status(200).json(sauces)
});

module.exports = app
