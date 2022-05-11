const { validationResult } = require("express-validator");

const registerUser = (req, res) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ success: false, err, data: {} });
  }
};

const loginUser = (req, res) => {
  res.json("login user");
};

module.exports = {
  registerUser,
  loginUser,
};
