require('dotenv').config()
const algorithm = `${process.env.CRYPTO_ALGORITHM}`
const secretKey = `${process.env.CRYPTO_KEY}`
const iv = Buffer.from(`${process.env.CRYPTO_IV}`, 'hex')
const crypto = require('crypto')

const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv)
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()])
  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex')
  }
}

// Si besoin de contacter l'utilisateur
const decrypt = (hash) => {
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'))
  const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()])
  return decrpyted.toString()
}

module.exports = {
  encrypt,
  decrypt
}