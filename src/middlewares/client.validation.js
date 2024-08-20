const { body, param, validationResult, query } = require("express-validator");

const validateCreateClient = [
  // Validar que 'identification' es obligatorio y de tipo string
  body("identification")
    .notEmpty()
    .withMessage("Client Credit ID is required")
    .isString()
    .withMessage("Client Credit ID must be a string"),

  // Validar que 'firstName' es obligatorio y de tipo string
  body("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .isString()
    .withMessage("First name must be a string"),

  // Validar que 'lastName' es obligatorio y de tipo string
  body("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .isString()
    .withMessage("Last name must be a string"),

  // Validar que 'email' es obligatorio, de tipo string y con formato válido
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email format is invalid"),

  // Validar que 'address' es obligatorio y de tipo string
  body("address")
    .notEmpty()
    .withMessage("Address is required")
    .isString()
    .withMessage("Address must be a string"),

  // Validar que 'type' es obligatorio y debe ser 'PERSON' o 'COMPANY'
  body("type")
    .notEmpty()
    .withMessage("Type is required")
    .isIn(["PERSON", "COMPANY"])
    .withMessage("Type must be either PERSON or COMPANY"),

  // Validar que 'registrationDate' es opcional pero si está presente debe ser una fecha válida
  body("registrationDate")
    .optional()
    .isISO8601()
    .withMessage("Registration date must be a valid date"),

  // Verificar errores de validación
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

module.exports = {
  validateCreateClient,
  validateIdParam,
  validatePagination,
};
