/* const jwt = require("jsonwebtoken");

const createAccessToken = (userId, role) => {
  const accessTokenSecret = process.env.JWT_SECRET || "access_fallback_secret";
  return jwt.sign({ userId, role }, accessTokenSecret, { expiresIn: "15m" });
};

const createRefreshToken = (userId, role) => {
  const refreshTokenSecret = process.env.JWT_REFRESH_SECRET || "refresh_fallback_secret";
  return jwt.sign({ userId, role }, refreshTokenSecret, { expiresIn: "7d" });
};

module.exports = { createAccessToken, createRefreshToken }; */

const jwt = require("jsonwebtoken");

const createToken = (id) => {
    const secret = process.env.JWT_SECRET || "fallback_secret";
    const token = jwt.sign({ userId: id }, secret, { expiresIn: "2h" });
    return token;
}

module.exports = createToken;