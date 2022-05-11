const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/UserController");
const {
  registerUserValidation,
  loginUserValidation,
} = require("../validation/User");

router.post("/register", registerUserValidation, registerUser);

router.post("/login", loginUserValidation, loginUser);
module.exports = router;
