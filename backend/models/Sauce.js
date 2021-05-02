const mongoose = require('mongoose')

const sauceSchema = mongoose.Schema({
    //id: {type: ObjectID, required: true}, // identifiant unique MongoDB pour l'utilisateur qui a créé la sauce.
    userId: {type: String, required: true}, // identifiant unique MongoDB pour l'utilisateur qui a créé la sauce.
    name: {type: String, required: true}, // nom de la sauce.
    manufacturer: {type: String, required: true}, // fabriquant de la sauce.
    description: {type: String, required: true}, // description de la sauce.
    mainPepper: {type: String, required: true}, // principal ingrédient de la sauce.
    imageUrl: {type: String, required: true}, // String de l'image de la sauce téléchargée par l'utilisateur.
    heat: {type: Number, required: true}, // String de l'image de la sauce téléchargée par l'utilisateur.
    likes: {type: Number, required: true}, // Nombres d'utilisateurs qui aiment la sauce.
    dislikes: {type: Number, required: true}, // Nombres d'utilisateurs qui n'aiment pas la sauce.
    usersLiked: {type: [String], required: true}, // Tableau d'identifiants d'utilisateurs ayant aimé la sauce.
    usersDisliked: {type: [String], required: true}, // Tableau d'identifiants d'utilisateurs n'ayant pas aimé la sauce.
})

module.exports = mongoose.model('Sauce', sauceSchema)
