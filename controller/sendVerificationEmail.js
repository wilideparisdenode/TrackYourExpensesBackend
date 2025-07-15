// this is where we will be sending the verrication through you email 
const nodemailler=require("nodemailer");
const bcrypt=require("bcrypt")

async function generateVerificationCod(req,res,email,next){
    let code=await bcrypt.hash(email,10);
    const shortenedCode=code.replace(/[^a-z-A-z0-9]/g,"").slice(0,12)
    

    nodemailler.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        }
    }).sendMail({
        from:process.env.EMAIL,
        to:email,
        subject:"Verification code",
        text:`your verification code is ${shortenedCode}</div>`,
        html:`<div style={backgroudcolor:green}>your verification code is ${shortenedCode}</div?`,
    }).then(()=>{
        return shortenedCode
    }).catch((err)=>{
        console.log(err)
    })
    next();

    return shortenedCode;
}

module.exports=generateVerificationCod;