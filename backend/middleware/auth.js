const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`)
    const userId = decodedToken.userId
    //Prevent account usurpation
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID'
    } else {
      next();
    }
  } catch (err) {
    //invalid or expired token
    res.status(498).json({error: new Error(err)})
  }
}