const jwt = require('jsonwebtoken');

// the user API
const hmac_key = 'hello';
const token = jwt.sign(
    { 
      email: 'dan@example.com' ,
      exp: Math.floor(Date.now() / 1000) + (5 * 60),
      iss: 'fusionauth.io',
      sub: 'test@example.com',
      aud: 'myapp.example.com',
      premiumUser: true
    }
    , hmac_key);

console.log(token);

// the todo api 

const options = {
   algorithms: "HS256", 
   ignoreExpiration: false, 
   issuer: "fusionauth.io"
};

const verified = jwt.verify(token, hmac_key, options);

// addl verification checks
if (verified.aud != 'myapp.example.com') {
  throw "invalid audience";
}

if (!verified.premiumUser) {
  throw "invalid access";
}

console.log(JSON.stringify(verified));
