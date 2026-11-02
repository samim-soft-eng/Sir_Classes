const mongo=require("mongoose");

const myschema = mongo.Schema({
    name : String,
    email : String,
    age : Number
    
})

const mymodel = mongo.model("mycollection", myschema)

module.exports = mymodel;