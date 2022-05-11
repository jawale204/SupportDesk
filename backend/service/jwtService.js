const jsonwebtoken = require("jsonwebtoken");
exports.createJwt = (id, email) => {
  const data = { id, email };
  const token = jsonwebtoken.sign(data, process.env.SECRET, {
    expiresIn: "1d",
  });
  return token;
};

exports.verifyToken = (token) => {
  try {
    const check = jsonwebtoken.verify(token, process.env.SECRET);
    return check;
  } catch (e) {
    return e.message;
  }
};
