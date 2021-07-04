const cryptoJS = require('crypto-js')

const email   = "virgile.gug@gmail.com"
const key = "myPassword"
var key = "6Le0DgMTAAAAANokdEEial"; //length=22
var iv  = "mHGFxENnZLbienLyANoi.e"; //length=22

key = CryptoJS.enc.Base64.parse(key);
//key is now e8b7b40e031300000000da247441226a, length=32
iv = CryptoJS.enc.Base64.parse(iv);
//iv is now 987185c4436764b6e27a72f2fffffffd, length=32

//TODO: stabiliser les variables de chiffrement
console.log('key :',cryptoJS.enc.Base64.parse("#base64Key#").toString())
console.log('iv :',cryptoJS.enc.Base64.parse("#base64IV#").toString())

const encrypted = cryptoJS.AES.encrypt(email, key, { iv: iv }).toString()
console.log('enc :',encrypted)

const decrypted = cryptoJS.AES.decrypt(encrypted, key, { iv: iv }).toString()
console.log('dec :',decrypted)


var cipherData = CryptoJS.AES.encrypt(message, key, { iv: iv });

var data = CryptoJS.AES.decrypt(cipherData, key, { iv: iv });
//data contains "some_secret_message"