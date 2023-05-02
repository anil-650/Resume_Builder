const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(user_id) {
   const payload = {
    user: {
        id: user_id
    }
   };

    // CURRENTLY 2hrs timeout
   return jwt.sign(payload, process.env.jwtSecret, {expiresIn: "2hr"});
}

module.exports = jwtGenerator;
