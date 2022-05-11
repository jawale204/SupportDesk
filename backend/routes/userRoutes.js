const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/UserController");
const { registerUserValidation } = require("../validation/User");

router.post("/register", registerUserValidation, registerUser);

router.post("/login", loginUser);
module.exports = router;
