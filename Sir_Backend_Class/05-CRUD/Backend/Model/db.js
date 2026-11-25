const mongo = require("mongoose")
const mongoSchema = new mongo.Schema({
    name:String,
    email:String,
    number:Number
})

const mongoModel = mongo.model("mern25",mongoSchema)
module.exports = mongoModel