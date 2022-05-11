const { body } = require("express-validator");
exports.registerUserValidation = [
  body("name")
    .not()
    .isEmpty()
    .bail()
    .withMessage("name should not be empty")
    .isLength({ min: 5, max: 10 })
    .withMessage("username should ne min5 max10"),

  body("email").isEmail().withMessage("Provide proper email"),

  body("password")
    .trim()
    .not()
    .isEmpty()
    .bail()
    .withMessage("Password should not be empty")
    .isLength({ min: 6, max: 12 })
    .withMessage("6<=password<=12"),
];

exports.loginUserValidation = [
  body("email").isEmail().withMessage("Provide proper email"),

  body("password")
    .trim()
    .not()
    .isEmpty()
    .bail()
    .withMessage("Password should not be empty")
    .isLength({ min: 6, max: 12 })
    .withMessage("6<=password<=12"),
];
