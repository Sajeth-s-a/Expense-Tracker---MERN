const express = require('express')
const router = express.Router()
const { getExpenses, addExpenses , deleteExpense } = require('../controller/expenses')

router
    .route('/expenses')
    .get(getExpenses)
    .post(addExpenses);


router
    .route('/expenses/:id') 
    .delete(deleteExpense)   
    
module.exports = router