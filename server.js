//The responsibility of the server.js file is to create a server that will listen on a given port.
//There should be no business logic in the server.js file.

const dotenv = require('dotenv') //require the dotenv package - this needs to load early in the server.js file
dotenv.config({path:__dirname+'/.env'}); //load the.env file

const express = require('express'); //require the express package
const cors = require('cors'); //require the cors package
const globalErrHandler = require('./middleware/globalErrHandler'); //require the globalErrHandler 
require('./config/dbConnect'); //require the dbConnect function to connect to the database
const usersRoute = require('./routes/users/usersRoute'); //require the usersRoute
const accountRoute = require('./routes/accounts/accountRoute'); //require the accountsRoute
const transactionsRoute = require('./routes/transactions/transactionsRoute'); //require the transactionsRoute

const app = express(); //initialize express 

//MIDDLEWARE
app.use(express.json()); //pass incoming JSON data to the server
app.use(cors()); //allow cross-origin requests

//ROUTES
//set the endpoint, then use the related callback function. 
//Setting the common endpoint here instead of in /routes/*Route.js makes it easier to update the common routes.
//Users route
app.use('/api/v1/users', usersRoute) 
//Accounts route
app.use('/api/v1/accounts', accountRoute)
//Transactions route
app.use('/api/v1/transactions', transactionsRoute)


//ERROR HANDLERS
app.use(globalErrHandler); //use the globalErrHandler middleware

//LISTEN
const PORT = process.env.PORT || 1313; //use the PORT env variable. If it doesn't exist, use port 1313
app.listen(PORT, console.log(`Server is running on port ${PORT}`)); //start listening on the port and send a message to the console
