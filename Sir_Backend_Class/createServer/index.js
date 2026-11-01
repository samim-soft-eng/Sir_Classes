const http = require("http")

const Server = http.createServer((req,res) => {
    if(req.url == "/"){
        res.end("This is Home")
    }
    else if(req.url == "/about"){
        res.end("This is about")
    }
    else if(req.url == "/contact"){
        res.end("This is contact")
    }
    else{
        res.end("404 not found")
    }
})

Server.listen(9800,()=>{
    console.log("Server start 9800 port")
})