require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const route = require('./src/routes')

const app = express()
app.use(express.json())

mongoose.connect(process.env.MONGO_STRING, {
    useNewUrlParser : true
}, mongoose.set("strictQuery", false))
.then(() => console.log("MongoDb is connected"))
.catch((err) => console.log(err))

app.use('/', route)

app.listen(process.env.PORT, () => console.log("Express app is running on Port",process.env.PORT))