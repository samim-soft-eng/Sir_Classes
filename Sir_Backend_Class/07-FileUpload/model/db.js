const mongo=require("mongoose")
const mongoSchema = mongo.Schema({
    name:String,
    email:String,
    file:String
})

const mongoModel=mongo.model("mern25file",mongoSchema)
module.exports=mongoModel