const express = require('express'); //require the express module
const { 
        createTransactionCtrl,
        getTransactionsCtrl,
        getTransactionCtrl,
        updateTransactionCtrl,
        deleteTransactionCtrl,
      } = require("../../controllers/transactions/transactionCtrl"); //require the transaction controller
const isLogin = require('../../middleware/isLogin');
const transactionsRoute = express.Router(); //use the express.Router class to create modular, mountable route handler



//Create Transaction
transactionsRoute.post('/', isLogin, createTransactionCtrl); //use express routing to create a new transaction

//Get All Transactions
transactionsRoute.get('/', getTransactionsCtrl); //use express routing to get all transactions

//Get Transaction by ID
transactionsRoute.get('/:id', getTransactionCtrl); //use express routing to get a single transaction

//Update Transaction by ID
transactionsRoute.put('/:id', updateTransactionCtrl); //use express routing to update a single transaction

//Delete Transaction by ID
transactionsRoute.delete('/:id', deleteTransactionCtrl); //use express routing to delete a single transaction


//export the transactionsRoute module
module.exports = transactionsRoute;