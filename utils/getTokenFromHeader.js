const getTokenFromHeader = req => {
  //Get the token from header
  const headerObj = req.headers; //make a headerObj out of the headers in the request
  const token = headerObj["authorization"].split(" ")[1]; //use .split() to split the token into an array, then pull the second element from the array
  //Verify the token
  if (token !== undefined) {
    return token;
  } else {
    return {
      status: "failed",
      message: "There is no token attached to the header",
    };
  }
};

module.exports = getTokenFromHeader; //export the getTokenFromHeader function
