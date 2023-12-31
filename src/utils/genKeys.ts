import crypto from 'crypto'
import fs from 'fs'

const genKeyPair = () => {
  const keyPair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
  })

  fs.mkdir(`${__dirname}/../keys`, () => {
    fs.writeFileSync(`${__dirname}/../keys/id_rsa_pub.pem`, keyPair.publicKey)
    fs.writeFileSync(`${__dirname}/../keys/id_rsa_priv.pem`, keyPair.privateKey)
  })
}

genKeyPair()
