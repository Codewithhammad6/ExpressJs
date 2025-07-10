
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const mongoDB = ()=>{
mongoose.connect(process.env.MONGO_URL).then(()=>{
console.log("Mongodb connected")
}).catch((err)=>{
console.log(`Mongodb connection failed ${err}`)
})
}

module.exports = mongoDB

