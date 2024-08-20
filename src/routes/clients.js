const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clients/client.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  validateCreateClient,
  validateIdParam,
  validatePagination,
  validateUpdateClient,
} = require("../middlewares/client.validation");

/**
 * @swagger
 * /clients:
 *   post:
 *     summary: Create a new client
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identification:
 *                 type: string
 *                 description: Unique identification number for the client.
 *                 example: "1234"
 *               firstName:
 *                 type: string
 *                 description: First name of the client.
 *                 example: "Angel"
 *               lastName:
 *                 type: string
 *                 description: Last name of the client.
 *                 example: "Morante"
 *               email:
 *                 type: string
 *                 description: Email address of the client.
 *                 example: "angel@venbo.com"
 *               address:
 *                 type: string
 *                 description: Address of the client.
 *                 example: "Av. A de la Carlota, Parr. Leoncio Martinez, Mun. Sucre, Miranda, Venezuela."
 *               type:
 *                 type: string
 *                 description: Type of client (PERSON or COMPANY).
 *                 example: "PERSON"
 *               employees:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of employees' IDs associated with the client (only for COMPANY type).
 *     responses:
 *       201:
 *         description: Client created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       400:
 *         description: Invalid input or credit issues prevent client creation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Description of the error.
 *       401:
 *         description: Unauthorized access.
 *       500:
 *         description: Internal server error.
 */
router.post(
  "/",
  authMiddleware,
  validateCreateClient,
  clientController.createClient
);

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Retrieve a list of clients
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: A list of clients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Client'
 */
router.get(
  "/",
  authMiddleware,
  validatePagination,
  clientController.getAllClients
);

/**
 * @swagger
 * /clients/{id}:
 *   get:
 *     summary: Get a client by ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The client ID
 *     responses:
 *       200:
 *         description: The client description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: Client not found
 */
router.get(
  "/:id",
  authMiddleware,
  validateIdParam,
  clientController.getClientById
);

/**
 * @swagger
 * /clients/{id}:
 *   put:
 *     summary: Update a client by ID
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the client to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identification:
 *                 type: string
 *                 description: Unique identification number for the client.
 *               firstName:
 *                 type: string
 *                 description: First name of the client.
 *               lastName:
 *                 type: string
 *                 description: Last name of the client.
 *               email:
 *                 type: string
 *                 description: Email address of the client.
 *               address:
 *                 type: string
 *                 description: Address of the client.
 *               type:
 *                 type: string
 *                 description: Type of client (PERSON or COMPANY).
 *               employees:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of employees' IDs associated with the client (only for COMPANY type).
 *     responses:
 *       200:
 *         description: Client updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       400:
 *         description: Invalid input or no changes detected.
 *       401:
 *         description: Unauthorized access.
 *       404:
 *         description: Client not found.
 *       500:
 *         description: Internal server error.
 */
router.put(
  "/:id",
  authMiddleware,
  validateIdParam,
  validateUpdateClient,
  clientController.updateClientById
);

/**
 * @swagger
 * /clients/{id}:
 *   delete:
 *     summary: Delete a client by ID
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the client to delete.
 *     responses:
 *       200:
 *         description: Client deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Client deleted
 *       401:
 *         description: Unauthorized access.
 *       404:
 *         description: Client not found.
 *       500:
 *         description: Internal server error.
 */
router.delete(
  "/:id",
  authMiddleware,
  validateIdParam,
  clientController.deleteClientById
);

module.exports = router;
