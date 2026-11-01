const express = require("express")
const app = express()

app.get("/",(req,res) =>{
    res.send("This is Home")
})
app.get("/about",(req,res) =>{
    res.send("This is about")
})
app.get("/myjson",(req,res) =>{
    res.json({
        message:"samim"
    })
})
app.get("/html",(req,res) =>{
    res.send(`<h1>Samim</h1>`)
})
app.listen(9800,() =>{
    console.log("Server start 9800 port")
})