const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next)=>{

    try{
        // 1. De-structure the response header

        // DEBUG ONLY
        console.log(req.headers);

        const jwtToken = req.header("token");

        // 2. Check for token

        if (!jwtToken){
        return res.status(403).json({error: "authorization denied"});
        }

        // 3. Verify the token

        const verify = jwt.verify(jwtToken, process.env.jwtSecret);
        req.user = verify.user;
        next();

    } catch (error){
        console.error(error.message);
        return res.status(403).json({error: "Token is not valid"});
    }
};
