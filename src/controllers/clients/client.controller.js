const Client = require("../../models/client.model");
const {
  verifyCompanyCreditStatus,
  validateEmployeeAssociation,
  validateUniqueEmail,
  validateRegistrationDate,
  validateUniqueIdentification,
} = require("./utils/validations");
const { sendWelcomeEmail } = require("./utils/actions");

/**
 * Create a new client
 * @param {Object} req Request object
 * @param {Object} res Response object
 */
const createClient = async (req, res) => {
  try {
    const clientData = req.body;

    await validateUniqueIdentification(clientData.identification);

    await verifyCompanyCreditStatus(clientData);

    await validateEmployeeAssociation(clientData.employees);

    await validateUniqueEmail(clientData.email);

    validateRegistrationDate(clientData.registrationDate);

    const client = new Client(clientData);
    await client.save();

    await sendWelcomeEmail(clientData.email);

    res.status(201).send(client);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

/**
 * Find all clients
 * @param {Object} req Request object
 * @param {Object} res Response object
 */
const getAllClients = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const clients = await Client.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Client.countDocuments();

    res.status(200).send({
      clients,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

/**
 * Find a client by ID
 * @param {Object} req Request object
 * @param {Object} res Response object
 */
const getClientById = async (req, res) => {
  try {
    const client = await Client.findOne({ _id: req.params.id });
    if (!client) {
      return res.status(404).send({ error: "Client not found" });
    }
    res.status(200).send(client);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

/**
 * Update a client by ID
 * @param {Object} req Request object
 * @param {Object} res Response object
 */
const updateClientById = async (req, res) => {
  try {
    const updates = req.body;
    const client = await Client.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!client) {
      return res.status(404).send({ error: "Client not found" });
    }

    res.status(200).send(client);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

/**
 * Delete a client by ID
 * @param {Object} req Request object
 * @param {Object} res Response object
 */
const deleteClientById = async (req, res) => {
  try {
    const client = await Client.findOneAndDelete({ _id: req.params.id });
    if (!client) {
      return res.status(404).send({ error: "Client not found" });
    }
    res.status(200).send({ message: "Client deleted" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createClient,
  getAllClients,
  getClientById,
  updateClientById,
  deleteClientById,
};
