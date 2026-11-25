const express = require("express")
const mongo = require("mongoose")
const muiter= require("multer")
const cloudinary=require("cloudinary").v2

const app = express()
app.use(express.urlencoded({extended:true}))

mongo.connect("mongodb+srv://samimdb:1234@cluster0.8lukmhj.mongodb.net/Practice")
.then((re)=>{
    console.log("Db connected")
}).catch((err) =>{
    console.log("Db not connected")
})


app.get("/",(req,res)=>{
    res.render("index.ejs")
})
app.listen(9800,()=>{
    console.log("Server run 9800 port...")
})