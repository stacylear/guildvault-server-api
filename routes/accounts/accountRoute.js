const express = require('express'); //require the express module
const { 
        createAccountCtrl,
        getAccountsCtrl,
        getAccountCtrl,
        updateAccountCtrl,
        deleteAccountCtrl,
      } = require('../../controllers/accounts/accountsCtrl'); //require the accounts controller
const isLogin = require('../../middleware/isLogin'); //require the isLogin middleware
const accountRoute = express.Router(); //use the express.Router class to create modular, mountable route handler

//Create Account
accountRoute.post('/', isLogin, createAccountCtrl); //check that user is logged in, then use express routing to create account

//Get all Accounts
accountRoute.get('/', getAccountsCtrl); //use express routing to get all accounts

//Get Account by ID
accountRoute.get('/:id', getAccountCtrl); //use express routing to get account by id

//Update Acccount by ID
accountRoute.put('/:id', updateAccountCtrl); //nuse express routing to update account by id

//Delete Account by ID
accountRoute.delete('/:id', deleteAccountCtrl); //use express routing to delete account by id


//export the accountsRoute module
module.exports = accountRoute; 