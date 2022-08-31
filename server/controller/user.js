const bcrypt = require("bcrypt")
const mongoose  = require("mongoose")
const jwt = require("jsonwebtoken")
require('../models/user')
const User = mongoose.model("user-Details")
JWT_SECRET = "saji123"

// @desc   Register User
// @route  POST /api/v1/signup
// @access Private
exports.postSignup = async (req,res) => {
    const {name,email,password} = req.body

    const encryptedPassword = await bcrypt.hash(password,10)

    try {
        const oldUser = await User.findOne({email})

        if(oldUser) {
            return res.json({error:"User already exits"})
        }
        const newUser = await User.create({
            name,
            email,
            password:encryptedPassword,    
        })
        return res.status(200).json({
            status: true,
            data : newUser
        })
    } catch (error) {
        res.send({status:"error"})
        console.log(error)
    }
}


// @desc   Register User
// @route  POST /api/v1/login
// @access Private
exports.postLogin = async (req,res) => {
    const {email,password} = req.body

    const user = await User.findOne({email})
    if(!user) {
        res.send({status:"User not found"})
    }
    if(await bcrypt.compare(password,user.password)) {
        const token = jwt.sign({email: user.email},JWT_SECRET)

        if(res.status(201)) {
            return res.json({status:"ok",data:token});
        }else {
            return res.json({error:"error"})
        }

    }
    res.json({ status: "error", error: "InvAlid Password" });
    
}