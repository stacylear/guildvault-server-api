const Account = require('../../model/Account'); //require the Account model
const User = require('../../model/User'); //require the User model
const { AppErr } = require('../../utils/appErr'); //require the AppErr class

//Create Account
const createAccountCtrl = async (req, res, next) => {
  //deconstruct the request body
  const { name, initialBalance, accountType, notes } = req.body;
    try {
      //Find the logged in user
      const userFound = await User.findById(req.user);
      if(!userFound) return next(new AppErr('User not found', 404)); //if the user is not found, return a 404 error
      //Else if user is found, create the new account
      const account = await Account.create({
        name,
        initialBalance,
        accountType,
        notes,
        createdBy: req.user,
      });
      //Push the account into the user's account array
      userFound.accounts.push(account);
      //Re-save the user
      await userFound.save();
      res.json({  //return the created account information
        status: 'success',
        data: account,  
      });
    } catch (error) {
      next(error);
    }
  };
  
//Get all Accounts
  const getAccountsCtrl = async (req, res) => {
    try {
      const accounts = await Account.find().populate("transactions"); //populate the account with the transactions
      res.json(accounts);
    } catch (error) {
      res.json(error);
    }
  };
  
//Get Account by ID
const getAccountCtrl = async (req, res, next) => {
  try {
    //Find the id from parameters
    const { id } = req.params;
    const account = await Account.findById(id).populate("transactions");
    res.json({
      status: "success",
      data: account,
    });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};
  
//Update Acccount by ID
const updateAccountCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await Account.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({
      status: "success",
      data: account,
    });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

  //Delete Acccount by ID
  const deleteAccountCtrl = async (req, res, next) => {
    try {
      const { id } = req.params;
      await Account.findByIdAndDelete(id);
      res.status(200).json({
        status: "success",
        data: null,
      });
    } catch (error) {
      next(new AppErr(error.message, 500));
    }
  };

  
  //Since we are exporting multiple functions, we export them as objects
  module.exports = {
    createAccountCtrl,
    getAccountsCtrl,
    getAccountCtrl,
    updateAccountCtrl,
    deleteAccountCtrl,
  };
  