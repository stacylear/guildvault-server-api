//Models are like classes - they create instances of objects, so the filename is Uppercase. 

const mongoose = require('mongoose'); //require the mongoose package

//USER SCHEMA
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    hasCreatedAccount: {
        typeof: Boolean, 
        default: false,
    },
    accounts: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        },
        ],   
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        }
    }
);

//The hasCreatedAccount field checks to see if the user has created an account. It has a default value of false, but will change to true if the user has created an account.
//The accounts field is an array of objects. Each object has an _id field, which is the ObjectId
//The timestamps field is set to true so that the createdAt and updatedAt fields will be created automatically.
//The toJSON method is used to convert virtual database objects into JSON format

const User = mongoose.model("User", userSchema); //User is the collection name inside the database

module.exports = User; //exports the User model

