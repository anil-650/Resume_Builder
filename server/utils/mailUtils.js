const mailer = require("nodemailer") // SENDING MAIL
const mailGen = require("mailgen") // GENERATING MAIL
require("dotenv").config()

const mail = JSON.parse(process.env.MAIL)

// change it to real ip on the website
// const website_link = "http://192.168.29.169:3000"
const website_link = process.env.FROENT_END_SITE

const reset_page = "/resetpassword"
const forget_page = "/forgotpassword"

// emailType = passReset || passResetSucess

async function mailMan(email_address, user_name, reset_link, emailType ){
    try{
        // STEP 1. CREATE TRANSPORT
            let transporter = mailer.createTransport({
                service: mail.SERVICE,
                auth: {
                    user: mail.EMAIL,
                    pass: mail.PASS
                }
            });

        // DEBUG
        console.log("STEP 1 mailMan create Instance complete")

        // STEP 1.5 CREATE EMAIL BODY
        let { emailBody, emailText } = genTemp(mail.USERNAME, website_link, user_name, reset_link, emailType )

        // DEBUG
        console.log("STEP 1.5 mailMan create email body complete")

        // STEP 2. CREATE MESSAGE

        let subject_text_passReset = 'request to account change password'
        let subject_text_passResetSucess = 'account password has been updated'

            let message = {
                from: `${mail.USERNAME} <${mail.EMAIL}>`,
                to: email_address,
                subject: emailType = 'passReset' ? `[MyresumeBuilder] ${subject_text_passReset}` : `[MyresumeBuilder] ${subject_text_passResetSucess}`,
                text: emailText,
                html: emailBody
            }

        // DEBUG
        console.log("STEP 2 mailMan create msg complete")

        // STEP 3. SEND MAIL
        let info = transporter.sendMail(message)
        // const data = await info

        // DEBUG
        // console.log(data)
        console.log("STEP 3 mailMan send mail complete")
        return info;

    }catch (err){
        if(err instanceof Error){
            console.error(err.message)
            throw err
        }
    }
}

function genTemp(website, weblink, uname, rlink, emailType){
    // email body content

    let email = {}
    let eTheme = 'salted'
    let eIntro, eInstruction, eText, eOutro, bcolor
    const currentTime = cTime()

    if(emailType === 'passReset'){

        eIntro = `You have recived this email beacuse a password reset request for your account was recived on ${currentTime}.`
        eInstruction = "Click the button below to reset your password:"
        eText = "Reset your password"
        eOutro = "If you didn't request this password reset no further action is needed on your part"
        bcolor = "#DC4D2F"

        email = {
            body: {
                name: uname,
                intro: eIntro,
                action: {
                    instructions: eInstruction,
                    button:{
                        color: bcolor,
                        text: eText,
                        link: `${weblink}${reset_page}?link=${rlink}`
                    }
                },
                outro: eOutro
            }
        };

    }else if(emailType === 'passResetSucess'){


        eIntro = `You updated the password for your MyresumeBuilder account on ${currentTime} .
            If you did NOT perform this password change, please reset your account password immediately on the given link.`
        eInstruction = "Click the button below to reset your password:"
        eText = "Reset your password"
        eOutro = "However If this password reset was done by you no further action is needed on your part"
        bcolor = "#8B2FDC"

        email = {
            body: {
                name: uname,
                intro: eIntro,
                action: {
                    button: {
                        instructions: eInstruction,
                        color: bcolor,
                        text: eText,
                        link: `${weblink}/${forget_page}`
                    }
                },
                outro: eOutro
            }
        }

    }else{
        return console.error("\u001b[1;32m"+"emailType is neither passResetSucess nor passReset")
    }

    const mailGenerator = new mailGen({
        theme: eTheme,
        product: {
            name: website,
            link: weblink
        }
    });

    const emailBody = mailGenerator.generate(email)
    const emailText = mailGenerator.generatePlaintext(email)

    return {"emailBody": emailBody, "emailText": emailText}
}

module.exports = { mailMan }

function cTime(){
    const date = new Date();

    const localeDate = date.toLocaleString('en-IN', {dateStyle: 'long' , timeStyle: 'long', timeZone: 'IST'})
    // console.log(localeDate)

    return localeDate;
}
