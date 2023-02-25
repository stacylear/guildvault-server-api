//Models are like classes - they create instances of objects, so the filename is Uppercase. 

const mongoose = require('mongoose'); //require the mongoose package

//ACCOUNT SCHEMA
const accountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    accountType: {
        type: String,
        enum: [
            "Savings",
            "Investment",
            "Checking",
            "Credit Card",
            "Utilities",
            "Travel",
            "Personal",
            "Groceries",
            "Entertainment",
            "Education",
            "Uncategorized",
        ],
        required: true,
    },
    initialBalance: {
        type: Number,
        default: 0,
    },
    transactions: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
        },
        ],   
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    notes: {
        type: String,
        required: true,
    },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        }
    }
);

//The accountTypes field uses an enumerated array to represent the different account types.
//The initialBalance field is a Number and populates with a default value of 0.
//The timestamps field is set to true so that the createdAt and updatedAt fields will be created automatically.
//The toJSON method is used to convert virtual database objects into JSON format

const Account = mongoose.model("Account", accountSchema); //User is the collection name inside the database

module.exports = Account; //exports the Account model

