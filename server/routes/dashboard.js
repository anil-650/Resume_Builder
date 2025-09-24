const router = require("express").Router();
const pool = require("../db");
const authorize = require("../middleware/authorize");

router.get("/", authorize, async(req, res) =>{
    try{
        // GET user name, email from database
        const getPro={
            text: `SELECT u.user_name, u.user_email, COUNT(r.id)
                 FROM uuser u 
                 LEFT JOIN resumes r
                 ON u.user_id = r.user_id
                 WHERE u.user_id = $1
                 GROUP BY u.user_id`
            ,values: [ req.user.id ]
        }

        const user = await pool.query(getPro);

        // SEND back data
        res.status(200).json(user.rows[0]);

    } catch (error){
        console.error(error.message);
        res.status(403).json({error:"user unauthotized"});
    }
})


router.get("/cvs", authorize, async(req, res) =>{
    try{
        // GET user name, email from database
        const queryCV ={
            text: `SELECT
            id, cv_title, created_at, updated_at, pdf, cv_template
            FROM resumes
            WHERE
            user_id = $1
            `,
            values: [req.user.id]
        }

        const cvData = await pool.query(queryCV);



        // SEND back data
        res.status(200).json(cvData.rows);

    } catch (error){
        console.error(error.message);
        res.status(403).json({"error":error.message});
    }
})


module.exports = router;
