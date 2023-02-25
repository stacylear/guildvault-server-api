const globalErrHandler = (err, req, res, next)=>{
    const statuscode = err.statusCode = err.statusCode || 500;
    const status = err.status = err.status || 'error';
    const message = err.message
    const stack = err.stack;
    res.status(statuscode).json({
        status, 
        message,
        stack
    })
}
//errors are objects, so we can add properties to them like status, message, and stack

module.exports = globalErrHandler; //export the error handler