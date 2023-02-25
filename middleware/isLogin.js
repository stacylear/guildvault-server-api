const { AppErr } = require("../utils/appErr");
const getTokenFromHeader = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verifyToken");

const isLogin = (req, res, next) => {
  //get token from request header
  const token = getTokenFromHeader(req);
  //verify the token
  const decodedUser = verifyToken(token);
  //save the user into the request object
  req.user = decodedUser.id;
  if (!decodedUser) {
    return next(new AppErr("Invalid/Expired Token, Please login again", 401)); 
  }
  next(); //move to the next middleware
}

module.exports = isLogin; //export the isLogin function
