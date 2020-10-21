const jwt = require('jsonwebtoken');

// the IdP
const hmac_key = 'hello javascript random STUFF$$!';
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

// the todo api 

const options = {algorithms: "HS256", ignoreExpiration: false, issuer: "fusionauth.io"};
const verified = jwt.verify(token, hmac_key, options);

// addl verification checks
if (verified.aud != 'myapp.example.com') {
  throw "invalid audience";
}

console.log(verified);
