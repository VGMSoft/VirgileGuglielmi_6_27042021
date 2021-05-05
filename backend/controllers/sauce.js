const Sauce = require('../models/Sauce')
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
  const saucePicture = req.file
    ? {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    : {...req.body}
  Sauce.updateOne({_id: req.params.id}, {...saucePicture, _id: req.params.id})
    .then(() => res.status(201).json({message: 'Sauce updated successfully!'}))
    .catch(error => res.status(400).json({error: error}))
}

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1]
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({_id: req.params.id})
          .then(() => res.status(200).json({message: 'Sauce Deleted!'}))
          .catch(error => res.status(400).json({error: error}))
      })
    })
    .catch(error => res.status(400).json({error: error}))
}

exports.opinionOnSauce = (req, res, next) => {
  switch (req.body.like) {
    case 1:
      Sauce.updateOne(
        {_id: req.params.id},
        {
          $inc: {likes: 1},
          $push: {usersLiked: req.body.userId}
        }
      )
        .then(res => res.status(201).json({message: 'Sauce liked !'}))
        .catch(error => res.status(400).json({error}))
      break

    case 0:
      Sauce.findOne({_id: req.params.id})
        .then(sauce => {
          if (sauce.usersLiked.find(userId => userId === req.body.userId)) {//TODO
            Sauce.updateOne(
              {_id: req.params.id},
              {
                $inc: {likes: -1},
                $pull: {usersLiked: req.body.userId}
              }
            )
              .then(res => res.status(201).json({message: 'Sauce like supprimé !'}))
              .catch(error => res.status(400).json({error: error}))
          }
          if (sauce.usersDisliked.find(userId => userId === req.body.userId)) {//TODO
            Sauce.updateOne(
              {_id: req.params.id},
              {
                $inc: {dislikes: -1},
                $pull: {usersDisliked: req.body.userId}
              }
            )
              .then(res => res.status(201).json({message: 'Sauce dislike supprimé !'}))
              .catch(error => res.status(400).json({error}))
          }
        })
        .catch(error => res.status(400).json({error: error}))
      break

    case -1:
      Sauce.updateOne(
        {_id: req.params.id},
        {
          $inc: {dislikes: 1},
          $push: {usersDisliked: req.body.userId}
        }
      )
        .then(res => res.status(201).json({message: 'Sauce disliked !'}))
        .catch(error => res.status(400).json({error: error}))
      break

    default:
      //TODO return ?
      //res.status(500).json({error})
      break
  }
}
