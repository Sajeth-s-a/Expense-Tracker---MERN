const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const brcypt = require("bcrypt")
const users = require('./routes/user')
const expenses = require('./routes/expenses')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = 5000;
const CONNECTION_URL="mongodb+srv://saji:saji@cluster0.zfft0pm.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
  .then(() => app.listen(PORT,() => console.log("Server Connected and Listening on ",PORT)))
  .catch((err) => console.log(err.message))

app.use('/api/v1/signup',users)  
app.use('/api/v1/login',users)
app.use('/api/v1/user/',expenses)