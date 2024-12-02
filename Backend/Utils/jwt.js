const jwt = require("jsonwebtoken");
const secret_key = process.env.SECRET_JWT_KEY;

function setUserToken(user) {
  payloads = {
    id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
  };

  const token = jwt.sign(payloads, secret_key);

  return token;
}

function getUserToken(token) {
  return jwt.verify(token, secret_key);
}

module.exports = {
  setUserToken,
  getUserToken,
};
