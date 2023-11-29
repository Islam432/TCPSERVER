const jwt = require('jsonwebtoken');
const fs = require('fs');

const PRIVATE_KEY = fs.readFileSync(`${__dirname}/../keys/id_rsa_priv.pem`, 'utf-8')

const user = {
  email: 'user@.com',
  role_name: 'admin',
   id: 1,
};

function issueJWT(user: { email: string; role_name: string; id: number }) {
  const { email, role_name, id } = user
  const payload = {
    sub: email,
    iat: Date.now(),
    role_name,
    id,
  }

  const signedJWT = jwt.sign(payload, PRIVATE_KEY, { expiresIn: '30d', algorithm: 'RS256' })
  return {
    token: 'Bearer ' + signedJWT,
    expiresIn: '30d',
  }
}

export { issueJWT,}