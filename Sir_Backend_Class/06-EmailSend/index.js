const express = require("express")
const sgmail= require("@sendgrid/mail")
require("dotenv").config () // to use env file 

const app = express()
app.use(express.json())

const port = process.env.PORT || 5000

//config to send grid account--
sgmail.setApiKey(process.env.SENDGRID_API_KEY)

app.post("/email",async(req,res)=>{
    const {to,subject,text}=req.body
    const msg={
        to:to,
        subject:subject,
        text:text,
        html:'<marks>'
    }
})

app.listen(port,()=>{
    console.log("port is ruuinng on",port)
})