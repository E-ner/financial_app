const { __jwtk } = require("../config/app-config");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

module.exports.createToken = async (payload) => {
  const jwtoken = await jwt.sign(payload, __jwtk, {
    expiresIn: '20m',
  });

  return jwtoken;
};

module.exports.bcryptCompare = (data, _hashed) => {
  return bcrypt.compareSync(data, _hashed);
};

module.exports.verifyToken = async (token) => {
  try {
    const payload = await jwt.verify(token,__jwtk);
    return payload;
  } catch (error) {
    if (typeof error == jwt.TokenExpiredError) {
      return 0;
    }
  }
}