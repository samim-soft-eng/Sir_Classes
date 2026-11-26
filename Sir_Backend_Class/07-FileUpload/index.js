const express = require("express")
const mongo = require("mongoose")
const multer = require("multer")
const cloudinary = require("cloudinary").v2
const path = require("path")

const app = express()
app.use(express.urlencoded({ extended: true }))

mongo.connect("mongodb+srv://samimdb:1234@cluster0.8lukmhj.mongodb.net/Practice")
    .then((re) => {
        console.log("Db connected")
    }).catch((err) => {
        console.log("Db not connected")
    })

const storage = multer.diskStorage({
    destination: "./public",
    filename: function (req, file, cb) {
        const filename = Date.now() + path.extname(file.originalname)
        cb(null, file.fieldname + '-' + filename)
    }
})

const upload = multer({ storage: storage })

// Configuration
cloudinary.config({
    cloud_name: 'mmkkw6i6',
    api_key: '453785744839437',
    api_secret: 'k-TYVVFl-pI2e4qNLjb0SOcAaaE' // Click 'View API Keys' above to copy your API secret
});

app.get("/", (req, res) => {
    res.render("index.ejs")
})

const User=require("./model/db")

app.post('/formsend', upload.single('file'),async function (req, res, next) {
    const result = req.file.path
    const response=await cloudinary.uploader.upload(result,{
        folder:"mern25"
    })
    const mydata=await User.create({
        name:req.body.name,
        email:req.body.email,
        file:response.secure_url,
    })
    res.json({
        message: "Data send successfull",
        data: mydata
    })
})

app.listen(9800, () => {
    console.log("Server run 9800 port...")
})