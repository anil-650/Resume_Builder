const router = require("express").Router();
const pool = require("../db");
const authorize = require("../middleware/authorize");

router.get("/", authorize, async(req, res) =>{
    try{
        // GET user name, email from database
        const user = await pool.query("SELECT user_name, user_email FROM uuser WHERE user_id = $1", [req.user.id]);

        // SEND back data
        res.status(200).json(user.rows[0]);

    } catch (error){
        console.error(error.message);
        res.status(403).json({error:"user unauthotized"});
    }
})

module.exports = router;
