console.log("hi");
var jwcrypto = require("browserid-crypto");
require("browserid-crypto/lib/algs/ds");

// random number generation is taken care of automatically
// with auto-seeding that is optimized for server or browser
// setup

// more entropy can be added as follows
// this can be useful to incorporate server-provided entropy
// on clients that don't have any good entropy of their own
// entropy should be either a 32 bit int, an array of ints, or a string
jwcrypto.addEntropy('entropy');

// generate a key
// we use DSA, which is "DS" in JSON Web Algorithm parlance
// we use keysize 160, which has a specific interpretation based
// on the algorithm, in this case DSA 1024/160, standard DSA.
jwcrypto.generateKeypair({
    algorithm: 'DSA',
    keysize: 160
}, function(err, keypair) {
    // error in err?

    // serialize the public key
    console.log(keypair.publicKey.serialize());

    // just the JSON object to embed in another structure
    console.log(JSON.stringify({stuff: keypair.publicKey.toSimpleObject()}));

    // replace this with the key to sign
    var publicKeyToCertify = keypair.publicKey.serialize();

    // create and sign a JWS
    var payload = {principal: {email: 'some@dude.domain'},
                    pubkey: jwcrypto.loadPublicKey(publicKeyToCertify)};

    jwcrypto.sign(payload, keypair.secretKey, function(err, jws) {
        // error in err?

        // serialize it
        console.log(jws.toString());

        // replace with things to verify
    var signedObject = jws;
    var publicKey = keypair.publicKey;

        // verify it
        jwcrypto.verify(signedObject, publicKey, function(err, payload) {
            // if verification fails, then err tells you why
            // if verification succeeds, err is null, and payload is
            // the signed JS object.
        });
    });

    // replace this with the key to load
    var storedSecretKey = keypair.secretKey.serialize();

    // also, if loading a secret key from somewhere
    var otherSecretKey = jwcrypto.loadSecretKey(storedSecretKey);
});
