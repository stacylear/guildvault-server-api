const express = require('express'); //require the express module
const { 
        registerUserCtrl, 
        userLoginCtrl,
        userProfileCtrl,
        updateUserCtrl,
        deleteUserCtrl
      } = require('../../controllers/users/usersCtrl'); //require the users controller
const isLogin = require('../../middleware/isLogin'); //require the isLogin middleware
const usersRoute = express.Router(); //use the express.Router class to create modular, mountable route handler


//Create User
usersRoute.post('/register', registerUserCtrl); //use express routing to create a new user

//Login User
usersRoute.post('/login', userLoginCtrl); //use express routing to login a user

//Get User Profile
usersRoute.get('/profile/', isLogin, userProfileCtrl); //check for valid token, then use express routing to get a user profile by ID

//Update User by ID
usersRoute.put('/', isLogin, updateUserCtrl); //check for valid login, then use express routing to update a user by ID

//Delete User by ID
usersRoute.delete('/', isLogin, deleteUserCtrl); //check for valid login, then use express routing to delete a user by ID


//export the usersRoute module
module.exports = usersRoute; 