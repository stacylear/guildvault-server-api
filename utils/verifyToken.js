const jwt = require("jsonwebtoken"); //require the jsonwebtoken library


const verifyToken = token => {
    return jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return false;
    } else {
      return decoded; //decoded is the decoded user
    }
  });
};

module.exports = verifyToken; //export the generateToken function