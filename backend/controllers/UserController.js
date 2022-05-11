const { validationResult } = require("express-validator");
const UserSchema = require("../models/User");
const bcrypt = require("bcryptjs");
const { createJwt } = require("../service/jwtService");

const registerUser = async (req, res) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ success: false, err, data: {} });
  }
  const { name, password, email } = req.body;

  try {
    const userExists = await UserSchema.findOne({
      $or: [{ name: name }, { email: email }],
    });
    if (userExists) {
      return res.status(400).json({
        success: false,
        data: {},
        err: null,
        message: "User Already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPasssword = await bcrypt.hash(password, salt);

    const user = {
      name,
      email,
      password: hashedPasssword,
    };

    const userRes = await UserSchema.create(user);
    const token = createJwt(userRes._id, userRes.email);
    return res.status(201).json({
      success: true,
      err: null,
      data: { _id: userRes._id, name: userRes.name, email: userRes.email },
      message: "user created",
      token,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      err: e.message,
      data: {},
      message: "internal server error",
    });
  }
};

const loginUser = (req, res) => {
  res.json("login user");
};

module.exports = {
  registerUser,
  loginUser,
};
