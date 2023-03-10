let jwt = require('jsonwebtoken');
require("dotenv").config();
let secret = process.env.JWT_SECRET;

function generateToken(user) {
    let payload = {
        email: user.email,
        password: user.password
    }
    return jwt.sign(payload, secret);
  }

function checkToken(token) {
  try {
    let result = jwt.verify(token, secret);
    return result;
  } catch(error) {
      return false;
  }
  }

module.exports = {generateToken, checkToken};