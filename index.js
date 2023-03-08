require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const route = require('./src/routes/routes')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_STRING, {
    useNewUrlParser : true
}, mongoose.set("strictQuery", false))
.then(() => console.log("MongoDB is connected"))
.catch((err) => console.log(err))

app.use('/', route)

app.use("/*", function(req,res){
    res.status(400).send("Provided url is wrong")
})

app.listen(process.env.PORT, () => console.log("CloudNotes app is running on Port",process.env.PORT))