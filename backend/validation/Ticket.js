const { body } = require("express-validator");
exports.createTicketValidation = [
  body("product")
    .not()
    .isEmpty()
    .bail()
    .withMessage("Product should not be empty")
    .matches({ options: ["iphone", "Macbook Pro", "iMac", "iPad"] })
    .withMessage("please selected listed products"),
  body("description")
    .not()
    .isEmpty()
    .bail()
    .withMessage("description should not be empty")
    .isLength({ min: 10, max: 500 })
    .withMessage("length between 10-500"),
];

exports.updateTicketValidation = [
  body("product")
    .not()
    .isEmpty()
    .bail()
    .withMessage("Product should not be empty")
    .matches({ options: ["iphone", "Macbook Pro", "iMac", "iPad"] })
    .withMessage("please select listed products"),
  body("description")
    .not()
    .isEmpty()
    .bail()
    .withMessage("description should not be empty")
    .isLength({ min: 10, max: 500 })
    .withMessage("length between 10-500"),
  body("status")
    .not()
    .isEmpty()
    .bail()
    .withMessage("status should not be empty")
    .matches({ options: ["iphone", "Macbook Pro", "iMac", "iPad"] })
    .withMessage("status not valid"),
];
