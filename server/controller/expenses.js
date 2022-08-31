const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
require('../models/expenses')
const Expenses = mongoose.model("user-expenses")
JWT_SECRET = "saji123"

// @desc Get all expenses of user
// @route GET /api/v1/api/expenses
// @access Private

exports.getExpenses = async (req,res) => {
    const token = req.headers['x-access-token']
    try {
        const decoded = jwt.verify(token,JWT_SECRET)
        const email = decoded.email
        const expenses = await Expenses.find().sort({createdAt:-1})
        console.log(expenses)
        return res.status(200).json({
            success : true,
            count : expenses.length,
            data : expenses
        })
        
    } catch (error) {
        return res.send(500).json({
            error : "Server error"
        })
    }
}

// @desc Post expenses of a user
// @route POST /api/v1/user/expenses
// @access Private

exports.addExpenses = async (req,res) => {
    const token = req.headers['x-access-token']
    try {
        const decoded = jwt.verify(token,JWT_SECRET)
        const email = decoded.email 
        const {name,amount} = req.body 

        const expenses = await Expenses.create(req.body)

        return res.status(201).json({
            success : true,
            data : expenses
        })
    } catch (error) {
        console.log(error)
    }
}

exports.deleteExpense = async (req,res) => {
    const token = req.headers['x-access-token']
    try {
        const decoded = jwt.verify(token,JWT_SECRET)
        const email = decoded.email
        const expenses = await Expenses.findById(req.params.id)
        const data = await Expenses.find().sort({createdAt:-1})

        if(!expenses) {
            return res.status(404).json({
                success : false,
                error : "No expense is found"
            }) 
        }

        await expenses.remove()

        return res.status(200).json({
            status : true,
            data : data
        })
    } catch (error) {
        res.status(500).json({
            status : false,
            error : "Could not delete"
        })
        console.log(error)
    }
}