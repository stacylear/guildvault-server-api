const User = require('../../model/User'); //require the user model
const Account = require('../../model/Account'); //require the account model
const Transaction = require('../../model/Transaction'); //require the transaction model
const { AppErr, appErr } = require('../../utils/appErr'); //require the AppError class and the appErrorfunction

//Create Transaction
const createTransactionCtrl = async (req, res, next) => {
  const { name, amount, notes, transactionType, account, category } = req.body;
  try {
    //Find user
    const userFound = await User.findById(req.user);
    if (!userFound) return next(new AppErr("User not found", 404));
    //Find the account
    const accountFound = await Account.findById(account);
    if (!accountFound) return next(new AppErr("Account not found", 404));
    //Create the transaction
    const transaction = await Transaction.create({
      amount,
      notes,
      account,
      transactionType,
      category,
      name,
      createdBy: req.user,
    });
    //Push the transaction to the account
    accountFound.transactions.push(transaction._id);
    //Re-save the account
    await accountFound.save();

    res.json({ status: "success", data: transaction });
  } catch (error) {
    res.json(error);
  }
};

//Get All Transactions
const getTransactionsCtrl = async (req, res, next) => {
  try {
    const trans = await Transaction.find();
    res.status(200).json({
      status: "success",
      data: trans,
    });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};
  
//Get Transaction by ID
const getTransactionCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const tran = await Transaction.findById(id);
    res.json({ status: "success", data: tran });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};
  
//Update Transaction by ID
const updateTransactionCtrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tran = await Transaction.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({
      status: "success",
      data: tran,
    });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};
  
//Delete Transaction by ID
const deleteTransactionCtrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Transaction.findByIdAndDelete(id);
    res.json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};


  //Since we are exporting multiple functions, we export them as objects
  module.exports = {
    createTransactionCtrl,
    getTransactionsCtrl,
    getTransactionsCtrl,
    getTransactionCtrl,
    updateTransactionCtrl,
    deleteTransactionCtrl,
  };
  