const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const router = require("express").Router();
const validinfo = require("../middleware/validinfo");
const checkLogin = require("../middleware/checkLogin");

router.post("/register", checkLogin, validinfo, async (req, res) => {
        if (req.cookies.loggedin === true){
            res.redirect('/dashboard')
        }
	// 1. de-structure body name,  email, password
	const {name, email, password} = req.body;
    
	try {
		// 2. check if user exists

		const user = await pool.query("SELECT * FROM uuser WHERE user_email = $1", [ email ]);

		if (user.rows.length !== 0) {

            // for debugging
			console.log("User already exists !!");

			return res.status(401).send("User already exists !!");
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

        // 6. SEND Cookie
        const cookieOptions = {
                    httpOnly: true,
                    maxAge: 60 * 60 * 1000,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax'
        }
        
        
        res.cookie('jwttoken', token, cookieOptions)
            .cookie('loggedin', "true", cookieOptions)
            .redirect('/login');

	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error") 
	}
});

// LOGIN ROUTE

router.post("/login", validinfo, async (req, res)=> {
try {
    // 0. Check if cookie already exists; send them to dashboard
    try{
        const uToken = req.cookies.jwttoken;
        if(uToken){
            console.log('redirect from login cuz token');
            return res.redirect('/dashboard');
        }
    } catch (error) {
        console.error(error);
    }
    
	// 1. De-structure body
	const { email, password } = req.body;

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
		return	res.status(401).json({error:"Password or Email Incorrect."});
	}
	
	// 4. Set token; redirect to dashboard
	const token = jwtGenerator(user.rows[0].user_id);

        const cookieOptions = {
                    httpOnly: true,
                    maxAge: 60 * 60 * 1000,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax'
        }
        
        
        res.cookie('jwttoken', token, cookieOptions)
            .cookie('loggedin', "true", cookieOptions)
            .redirect('http://192.168.29.138:3000/dashboard');
    
    // DEBUG ONLY
    console.log(`token sent ${token}`)

} catch (error) {
	console.error(error.message);
	res.status(500).send("Server Error") 
}
});

// LOGOUT

router.post("/logout", (res) => {
    try{
        // 1. DELETE Cookie
        
        const cookieOptions = {
                    httpOnly: true,
                    maxAge: 0,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict'
                }

        res.cookie('jwttoken', '', cookieOptions)
            .cookie('loggedin', "false", cookieOptions)
            .redirect('http://192.168.29.138:3000/login');
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;
