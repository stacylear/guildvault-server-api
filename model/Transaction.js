//Models are like classes - they create instances of objects, so the filename is Uppercase. 

const mongoose = require('mongoose'); //require the mongoose package

//ACCOUNT SCHEMA
const transactionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    transactionType: {
        type: String,
        enum: ["Income", "Expenses"],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        enum: [
            "Food",
            "Transportation",
            "Entertainment",
            "Shopping",
            "Utilities",
            "Health",
            "Travel",
            "Education",
            "Personal",
            "Groceries",
            "Bills",
            "Uncategorized",
        ],
        required: true,
    },
    color: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
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

//The transactionType and category fields use enumerated arrays to represent the different transactions and categories.
//The timestamps field is set to true so that the createdAt and updatedAt fields will be created automatically.
//The toJSON method is used to convert virtual database objects into JSON format

const Transaction = mongoose.model("Transaction", transactionSchema); //User is the collection name inside the database

module.exports = Transaction; //exports the Transaction model

