const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

// creates a JWT from a user and stores the username in the payload

function createToken(user) {

    let payload = {
        username: user.username
    };

    return jwt.sign(payload, SECRET_KEY);
}

module.exports = { createToken };
