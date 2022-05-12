const { validationResult } = require("express-validator");
const UserSchema = require("../models/User");
const bcrypt = require("bcryptjs");
const { createJwt } = require("../service/jwtService");
const bcryptjs = require("bcryptjs");

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
    const hashedPasssword = await bcrypt.hash(password.trim(), salt);

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
      data: {
        _id: userRes._id,
        name: userRes.name,
        email: userRes.email,
        token,
      },
      message: "user created",
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

const loginUser = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ success: false, err: error, data: {} });
  }
  try {
    const { email, password } = req.body;

    const user = await UserSchema.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        err: null,
        data: {},
        message: "User not found",
      });
    }
    const check = await bcryptjs.compare(password, user.password);
    if (!check) {
      return res.status(400).json({
        success: false,
        err: null,
        data: {},
        message: "wrong user credentials ",
      });
    }

    const token = createJwt(user._id, user.email);

    return res.status(200).json({
      success: true,
      err: null,
      data: { _id: user._id, name: user.name, email: user.email, token },
      message: "logged in",
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

const getMe = (req, res) => {
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
  };
  return res.status(200).json({
    success: true,
    err: null,
    data: user,
    message: "user found",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
