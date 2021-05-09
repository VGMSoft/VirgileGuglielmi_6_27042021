const crypto = require('crypto')
const fs = require('fs')

function genKeyPair() {
  // Generates an object where the keys are stored in properties `privateKey` and `publicKey`
  const keyPair = crypto.generateKeyPairSync('rsa', {
    modulusLength: Math.pow(2, 12), // bits - standard for RSA keys
    publicKeyEncoding: {type: 'pkcs1', format: 'pem'},
    privateKeyEncoding: {type: 'pkcs1', format: 'pem'}
  })

  // Create the public key file
  fs.writeFileSync(__dirname + '/id_rsa_pub.pem', keyPair.publicKey);

  // Create the private key file
  fs.writeFileSync(__dirname + '/id_rsa_priv.pem', keyPair.privateKey);

}

// Generate the keypair
genKeyPair();