const express = require("express")
const mongo = require("mongoose")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors()) // one domain connect to another domain like 5173 to 9800

//db connection
mongo.connect("mongodb+srv://samimdb:1234@cluster0.8lukmhj.mongodb.net/Practice")
.then(()=>{
    console.log("Db connected")
}).catch(() =>{
    console.log("Db not connected")
})

const User = require("./Model/db")
//create
app.post("/create",(req,res)=>{
    const result = User.create(req.body)
    .then((response) =>{
        res.json({
            massage:"Data Created",
            data:response
        })
    }).catch((err) =>{
        res.json({
            massage:"Data not create",
            error:err
        })
    })
})

//read
app.get("/",(req,res) =>{
    User.find({}) //get all data
    .then((response) =>{
        res.json({
            massage:"Data Created",
            data:response
        })
    }).catch((err) =>{
        res.json({
            massage:"Data not create",
            error:err
        })
    }) 
})

//Delete
app.delete("/delete/:id",(req,res) =>{
    const id = req.params.id
    User.findByIdAndDelete({_id:id})
    .then((response) =>{
        res.json({
            massage:"Data Created",
            data:response
        })
    }).catch((err) =>{
        res.json({
            massage:"Data not create",
            error:err
        })
    }) 
})

//update
app.get("/update/:id",(req,res) =>{
    const id=req.params.id
    User.findById({_id,id})
    .then((response) =>{
        res.json({
            massage:"Data Created",
            data:response
        })
    }).catch((err) =>{
        res.json({
            massage:"Data not create",
            error:err
        })
    }) 
})

app.listen(9800,()=>{
    console.log("Server is running 9800 port")
})