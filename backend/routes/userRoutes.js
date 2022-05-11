const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/UserController");
const { authMiddleware } = require("../middleware/authMiddleware");
const {
  registerUserValidation,
  loginUserValidation,
} = require("../validation/User");

router.post("/register", registerUserValidation, registerUser);

router.post("/login", loginUserValidation, loginUser);

router.get("/me", authMiddleware, getMe);

module.exports = router;
