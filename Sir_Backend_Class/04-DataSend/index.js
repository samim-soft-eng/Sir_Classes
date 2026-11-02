const express = require("express");
const mongo = require("mongoose");
const app = express()

app.use(express.urlencoded({extended : true}))

mongo.connect("mongodb+srv://samimdb:1234@cluster0.8lukmhj.mongodb.net/Practice").then(() => {
    console.log("Database connected");
}).catch(() => {
    console.log("Database not connected");
})

const myname = "Samim"
const obj={
    name : "Samim Mondal",
    age : 22,
    city : "Dhaka"
}
app.get("/" , (req,res) => {
    res.render("index.ejs", { myname, obj })
})

const user=require("./db/db")

app.post("/formsend" , async(req,res) => {
    const result = await user.create(req.body)
    res.json({
        data : result
    })
})

app.listen(9800, () => {
    console.log("Server is running on port 9800");
})