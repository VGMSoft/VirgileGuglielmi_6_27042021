const Sauce = require('../models/Sauce');
const fs = require('fs')

exports.getAllSauce = (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({error}))
}

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({error}))
}

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce)
  delete sauceObject._id
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: []
  })
  sauce.save()
    .then(() => res.status(201).json({message: 'Sauce saved successfully!'}))
    .catch(error => res.status(400).json({error}))
}

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    : {...req.body}
  Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
    .then(() => res.status(201).json({message: 'Sauce updated successfully!'}))
    .catch(error => res.status(400).json({error: error}))
}

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({_id: req.params.id})
          .then(() => res.status(200).json({message: 'Sauce Deleted!'}))
          .catch(error => res.status(400).json({error: error}))
      })
    })
    .catch(error => res.status(400).json({error: error}))
}

  exports.likeSauce = (req, res, next) => {
  /*  const like = req.body.j'aime';
    switch (like) {
      case 1:
        req.body.likes ++
        break
      case 0:
      req.body.likes = 0
      break
      case -1:
      req.body.likes --
        break
      default:

    }*/
  }



