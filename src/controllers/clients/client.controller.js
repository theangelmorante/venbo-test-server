const Client = require("../../models/client.model");
const {
  verifyCompanyCreditStatus,
  validateEmployeeAssociation,
  validateUniqueEmail,
  validateRegistrationDate,
  validateUniqueIdentification,
} = require("./utils/validations");
const { sendWelcomeEmail } = require("./utils/actions");

// Método principal para crear un nuevo cliente
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

// Get all clients
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

// Get a client by ID
const getClientById = async (req, res) => {
  try {
    const client = await Client.findOne({ id: req.params.id });
    if (!client) {
      return res.status(404).send({ error: "Client not found" });
    }
    res.status(200).send(client);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Update a client by ID
const updateClientById = async (req, res) => {
  try {
    const updates = req.body;
    const { employees, email } = updates;

    await validateEmployeeAssociation(employees);

    await validateUniqueEmail(email);

    const client = await Client.findOneAndUpdate(
      { id: req.params.id },
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

// Delete a client by ID
const deleteClientById = async (req, res) => {
  try {
    const client = await Client.findOneAndDelete({ id: req.params.id });
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
