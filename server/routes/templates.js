const pool = require("../db");
const router = require("express").Router();

// RETURN TEMPLATES DATA

router.get("/", (req, res) => {

    // DEBUG ONLY
    console.log("/server/routes/templates.js : Template data requested")

    const query = 'SELECT * FROM templates';

    pool.query(query, (err, result)=>{
        if(err){
            console.error(err);
            res.status(500).send("Error Fetching data from database");
        } else {
            res.status(200).json(result.rows);
        }
    });
});

module.exports = router;
