const { body, param, validationResult, query } = require("express-validator");

const validateCreateClient = [
  body("identification")
    .notEmpty()
    .withMessage("Client identification is required")
    .isString()
    .withMessage("Client identification must be a string"),

  body("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .isString()
    .withMessage("First name must be a string"),

  body("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .isString()
    .withMessage("Last name must be a string"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email format is invalid"),

  body("address")
    .notEmpty()
    .withMessage("Address is required")
    .isString()
    .withMessage("Address must be a string"),

  body("type")
    .notEmpty()
    .withMessage("Type is required")
    .isIn(["PERSON", "COMPANY"])
    .withMessage("Type must be either PERSON or COMPANY"),

  body("registrationDate")
    .optional()
    .isISO8601()
    .withMessage("Registration date must be a valid date"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateIdParam = [
  param("id")
    .notEmpty()
    .withMessage("ID parameter is required")
    .isString()
    .withMessage("ID must be a string"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validatePagination = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive integer"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateUpdateClient = [
  body("firstName")
    .optional()
    .isString()
    .withMessage("First name must be a string"),
  body("lastName")
    .optional()
    .isString()
    .withMessage("Last name must be a string"),
  body("email").optional().isEmail().withMessage("Email format is invalid"),
  body("address").optional().isString().withMessage("Address must be a string"),
  body("registrationDate")
    .optional()
    .isISO8601()
    .withMessage("Registration date must be a valid date"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateCreateClient,
  validateIdParam,
  validatePagination,
  validateUpdateClient,
};
