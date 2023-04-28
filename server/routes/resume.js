const pool = require("../db");
const bcrypt = require("bcrypt");
const router = require("express").Router();
const authorize = require("../middleware/authorize");

router.post("/save" , authorize, async (req, res)=>{
    const { personal, education, experience, others } = req.body;

    try{
        const p = JSON.stringify(personal)
        const edu = JSON.stringify(education)
        const exp = JSON.stringify(experience)
        const o = JSON.stringify(others)
        console.table(req.user.id)

        const qstring = `INSERT INTO
        resumes ( user_id, cv_title, cv_objective, cv_template, personal, education, experience, others )
        VALUES  ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;`

        const qargs = [req.user.id, personal.cv_title, personal.cv_objective, personal.cv_template, p, edu, exp, o]

        const newResume = await pool.query(qstring, qargs);

        res.json(newResume.rows[0])
    } catch(error){
        if(error instanceof Error){
            console.error(error.message)
            res.status(400).json(error);
        }
    }
});

module.exports = router;
