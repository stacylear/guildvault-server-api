//This creates a class or function

//appErr class
class AppErr extends Error {
    constructor(message, statusCode) {
        super(message); //pass the message to the super of the class
        this.statusCode = statusCode;
        this.status = 'failed';
    
    }
}

//appErr function
const appErr = (message, statusCode) => {
    let error = new Error(message); //this creates an instance of error that passes in a single message
    error.statusCode = statusCode;
    return error;
}

//Since we are exporting multiple functions, we export them as objects
module.exports = {
    AppErr,
    appErr
};