const pool = require("../db");
const router = require("express").Router();
const authorize = require("../middleware/authorize");

// IMPORT GOOGLE CLOUD STORAGE AND PUPPETEER

const pup = require("puppeteer")
const { Storage } = require("@google-cloud/storage")

// BUCKET INITIALIZE

let projectID = "myresumebuilder-382004"
let keyFilename = "keyfile.json"
const storage = new Storage({
    projectID,
    keyFilename,
})

// GET BUCKET

const bucket = storage.bucket("myresume-b-1")

// SET BASE URL FOR THE CLIENT SITE

// const baseurl = 'http://34.29.31.48:3000'
const baseurl = 'http://localhost:3000'

router.get("/gencv/:id", async (req, res)=>{
    try{
    const id = req.params.id
    const cvQuery = {
        text: `SELECT
            personal, education, experience, others
            FROM
            resumes
            WHERE
            id = $1
            `,
        values: [ id ]
    }

    const data = await pool.query(cvQuery)
    const resumeData = data.rows[0]

    res.json(resumeData)
    } catch(error){
        if(error instanceof Error){
            console.error(error.message)
            res.status(400).json(error);
        }

    }

    // UNFINISHED <===
});

router.post("/save" , authorize, async (req, res)=>{

    // STEP 1 DE STRUCTURE RES BODY

    const { personal, education, experience, others } = req.body;

    // START INSERT PROCESS

    try{

        // STEP 2 STRING FY ALL VALUES TO BE INSERTED

        const p = JSON.stringify(personal)
        const edu = JSON.stringify(education)
        const exp = JSON.stringify(experience)
        const o = JSON.stringify(others)
        console.table(req.user.id)

        // QUERY AND PARAMS

        const qstring = `INSERT INTO
        resumes ( user_id, cv_title, cv_objective, cv_template, personal, education, experience, others )
        VALUES  ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id,cv_template;`

        const qargs = [req.user.id, personal.cv_title, personal.cv_objective, personal.cv_template, p, edu, exp, o]

        // STEP 3 CREATE NEW RESUME AND RETURN id,cv_template

        const newResume = await pool.query(qstring, qargs);

        // STEP 4 UPLOAD TO GOOGLE CLOUD

        const {id, cv_template} = newResume.rows[0]
        
        const pdflink = await genPDF(id, cv_template)

        // STEP 5 INSERT THE PDF LINK TO TABLE

        const linkUpdateQuery = {
            text: `UPDATE resumes
            SET pdf = $2
            WHERE id = $1
            `,
            values: [id, pdflink]
        }

        await pool.query(linkUpdateQuery)

        // RETURN SUCCESS

        res.status(200).json({id, pdflink})

    } catch(error){
        if(error instanceof Error){
            console.error(error.message)
            res.status(400).json(error);
        }
    }
});

router.get("/download", async (req, res)=>{});

module.exports = router;


async function genPDF(id, cv_template){

    // LAUNCH BROWSER 1020p res
    const browser = await pup.launch({
        defaultViewport: {
            width: 1280,
            height: 720
        }
    })

    const url = new URL(`/cv-builder/genpdf/${cv_template}-${id}`, baseurl)

    const page = await browser.newPage()

    // GO TO CV GEN PDF PAGE
    await page.goto(url)

    // CREATE PDF
    const pdf = await page.pdf({
        format: 'A4',
        printBackground: true
    })

    // CLOSE BROWSER
    await browser.close()

    console.log("pdf generated")

    // START UPLOADING
    try {
        console.log("trying to upload")

        const pdfFile = bucket.file(`${id}.pdf`)
        await pdfFile.save(pdf)

        console.log("success")

        const link = pdfFile.publicUrl();

        console.log("link creation success")

        console.log(link)

        return link
    } catch(error){
        if(error instanceof Error){
            console.error(error.message)
            throw new Error(`failed to generate pdf
            ${error.message}`)
        }
    }

}
