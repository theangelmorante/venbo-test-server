const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clients/client.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  validateCreateClient,
  validateIdParam,
  validatePagination,
} = require("../middlewares/client.validation");

// Routes
router.post(
  "/",
  authMiddleware,
  validateCreateClient,
  clientController.createClient
);

router.get(
  "/",
  authMiddleware,
  validatePagination,
  clientController.getAllClients
);

router.get(
  "/:id",
  authMiddleware,
  validateIdParam,
  clientController.getClientById
);

router.put(
  "/:id",
  authMiddleware,
  validateIdParam,
  clientController.updateClientById
);

router.delete(
  "/:id",
  authMiddleware,
  validateIdParam,
  clientController.deleteClientById
);

module.exports = router;
