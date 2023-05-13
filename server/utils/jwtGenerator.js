const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(user_id, token_time) {
   const payload = {
    user: {
        id: user_id
    }
   };

    // TOKEN_TIME TO TIME OUT THE TOKEN
   return jwt.sign(payload, process.env.jwtSecret, {expiresIn: token_time});
}

module.exports = jwtGenerator;
