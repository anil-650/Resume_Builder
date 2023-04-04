const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next)=>{

    // 1. De-structure the response header

    // DEBUG ONLY
    const str = "from authorize \n"
    console.log(str);
    console.log(req.headers);

    const jwtToken = req.header("token")
    console.log("This is the returned cookie " + jwtToken)

    // 2. Check for token

    if (!jwtToken){
        return res.status(403).json({error: "authorization denied"});
    }

    // 3. Verify the token

    try{
        const verify = jwt.verify(jwtToken, process.env.jwtSecret);
        req.user = verify.user;
        next();

    } catch (error){
        console.error(error.message);
        return res.status(401).json({error: "Token is not valid"});
    }
};
