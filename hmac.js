const jwt = require('jsonwebtoken');
const hmac_key = 'hello denverscript!';
const token = jwt.sign(
    { 
      email: 'test@example.com' ,
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      iss: 'fusionauth.io',
      sub: 'test@example.com',
      aud: 'myapp.example.com'

    }
    , hmac_key);

console.log(token);

const verified = jwt.verify(token, hmac_key);
console.log(verified);
