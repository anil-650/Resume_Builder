const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const router = require("express").Router();
const validinfo = require("../middleware/validinfo");
const authorize = require("../middleware/authorize");

router.post("/register",  validinfo, async (req, res) => {

    // 1. de-structure body name,  email, password
    const {name, email, password} = req.body;

    try {
        // 2. check if user exists

        const user = await pool.query("SELECT * FROM uuser WHERE user_email = $1", [ email ]);

        if (user.rows.length !== 0) {

            // for debugging
            console.log("User already exists !!");

            return res.status(401).json({error: "User already exists !!"});
        }

        // 3. Bcrypt user password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);

        // 4. enter user inside database
        let newUser = await  pool.query(
            "INSERT INTO uuser (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *;"
            ,[name, email, bcryptPassword]);


        // 5. JWT token generation
        const token = jwtGenerator(newUser.rows[0].user_id);

        // DEBUG ONLY
        console.log("token sent");

        // 6. SEND TOKEN
        res.status(201).json({ token });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server Error" }) 
    }
});

// LOGIN ROUTE

router.post("/login", validinfo, async (req, res)=> {

    // 1. De-structure body
    const { email, password } = req.body;

    try{

        // 2. Check if user does not exist
        const user = await pool.query("SELECT * FROM uuser WHERE user_email = $1", [ email ]);

        if (user.rows.length === 0) {
            return res.status(401).json({error:"Password or Email Incorrect."});
        }
        // 3. check if incoming password is the same as the database password
        const validPassword = await bcrypt.compare(
            password,
            user.rows[0].user_password
        );

        if (!validPassword) {
            return res.status(401).json({error:"Password or Email Incorrect."});
        }

        // 4. Set token; redirect to dashboard
        const token = jwtGenerator(user.rows[0].user_id);


        // DEBUG ONLY
        console.log(`token sent ${token}`);

        // 5. SEND TOKEN
        return res.json({ token });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error") 
    }
});


router.post("/verify", authorize, (req, res)=>{
    try{
        res.json(true);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: "Server Error"});
    }
})

module.exports = router;
