const jwt = require('jsonwebtoken'); //require the jsonwebtoken library

//return a function that takes in a user (id) object and returns a token
//JWT_KEY is a variable stored in the .env file
const generateToken = id => {
    return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "20d" }); //token expires in 20 days
};

module.exports = generateToken;//export the generateToken function