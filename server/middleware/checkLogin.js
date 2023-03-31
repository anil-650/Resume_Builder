require("dotenv").config();

module.exports = async (req, res, next)=>{

    try{

        // DEBUG ONLY
        console.log(req.body);

        const loggedIn = req.cookies.loggedIn;

        // 2. Check for token

        if (loggedIn === "true"){
            console.log('Redirect cuz Logged in');
            return res.redirect('/dashboard');
        }


    } catch (error){
        console.error(error.message);
        return res.status(403).json({error: "Token is not valid"});
    }
        next();
};
