console.log("samim")

// common js
// const abc = require("./math")
// console.log(abc.sum(10,30))
// console.log(abc.sub(40,30))

// es module
import {sum,sub} from "./math.js"
console.log(sum(10,30))
console.log(sub(40,30))
