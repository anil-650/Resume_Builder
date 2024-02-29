const pool = require("../db")
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");
const validate = require("../middleware/validemail")
const { mailMan } = require("../utils/mailUtils")
const router = require("express").Router();

router.get('/', validate, async (req, res)=>{
    // STEP 1 GET USER EMAIL

    // DEBUG
    console.log('/resetpassword was hit')

    const { email } = req.query

    // DEBUG
    console.log('STEP 1 got email')


    // STEP 2 CHECK IF USER EXISTS
    try{
        const user = await pool.query('SELECT * FROM uuser WHERE user_email=$1', [ email ])

        // HANDEL IF USER DOEST EXISTS
        if(user.rows.length == 0){

            // DEBUG
            console.error(`${email} does not exist`)

            return res.status(400).json({
                "error" : `${email} is unregistered`
            })
        };

        // DEBUG
        console.log("STEP 2 checked for user")

        // STEP 3 GENERATE JWT TOKEN WITH UUID
        const token_time = "15m"
        const token = jwtGenerator(user.rows[0].user_id, token_time)

        // DEBUG
        console.log("STEP 3 generated token")

        // STEP 4 SEND MAIL WITH TOKEN

        await mailMan(email, user.rows[0].user_name, token, 'passReset')

        res.sendStatus(200)

        // res.status(200).json({
        // "uid": user.rows[0].user_email,
        // "name": user.rows[0].user_name,
        // "token": token,
        // "msg": "link sent"
        // })

    }catch (err){
        if(err instanceof Error){
            console.error(err.message)
            res.status(500).json({"error": err.message})
        }
    }
});

router.put('/', authorize, validate, async(req, res)=>{
    console.log('/resetpassword was hit')
    // STEP 1 GET  PASS FROM BODY
    const { password } = req.body
    const id = req.user.id
    console.log(id, password)

    // DEBUG
    console.log('STEP 1 got email')
    // for sending mail
    let queryResult = null;

    // STEP 2 HASH PASS
    // DEBUG
    console.log("STEP 2 hasing password")

    try{
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);

        // STEP 3 UPDATE TABLE WITH UUID FROM THE req.user.id

        // DEBUG
        console.log("STEP 3 updating password")
        const query = `UPDATE uuser
    SET user_password = $1
    WHERE user_id = $2
    RETURNING user_email, user_name`

        const values = [ bcryptPassword, id ]

        queryResult = await pool.query(query, values)

        // STEP 4 RETURN SUCCESS OR FAIL ON RESULT

        // DEBUG
        console.log("STEP 4 db query complete")

        res.status(200).json({"message": "password reset sucess"})
    }catch(err){
        if(err instanceof Error){
            console.error(err.message)
            return res.status(500).json({"error": err.message})
        }
    }

    // STEP 5 SEND RESET SUCCESSFUL MAIL

    // DEBUG
    console.log("STEP 5 SENT mail Sucess")

    if(queryResult != null){
        try{
            await mailMan(queryResult.rows[0].user_email, queryResult.rows[0].user_name, null, 'passResetSucess')
        }catch(err){
            if(err instanceof Error){
                console.error(err.message)
            }
        }
    }



})
module.exports = router
