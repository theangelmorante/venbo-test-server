const Client = require("../../../models/client.model");
const { checkCreditStatus } = require("../../../services/creditService");

/**
 * Find if an employee is associated with another client
 * @param {Array<Employe>} employees Array of employees objects to validate if exist in another client
 * @param {string} clientId ID of the client to exclude from the search
 * @returns {string} ID of the employee associated with another client
 */
const findEmployeenAssociatedWithAnotherClient = async (
  employees,
  clientId
) => {
  for (const employee of employees) {
    const existingClient = await Client.findOne({
      "employees.id": employee.id,
      _id: { $ne: clientId },
    });
    if (existingClient) {
      return employee.id;
    }
  }
  return null;
};

/**
 * Validate if an employee is associated with another client
 * @param {Array<Employe>} employees Array of employees objects to validate if exist in another client
 */
const validateEmployeeAssociation = async (employees) => {
  const employeeId = await findEmployeenAssociatedWithAnotherClient(
    employees,
    null
  );

  if (employeeId) {
    throw new Error(
      `Employee with ID ${employeeId} is already associated with another client.`
    );
  }
};

/**
 * Verify if a company has credit issues
 * @param {Object} clientData Client data object
 */
const verifyCompanyCreditStatus = async (clientData) => {
  const { type, identification } = clientData;

  if (type === "COMPANY") {
    const creditStatus = await checkCreditStatus(identification);

    if (!creditStatus.isEligible) {
      throw new Error("Client cannot be created due to credit issues.");
    }
  }
};

/**
 * Validate if an email is unique
 * @param {string} email Email to validate
 */
const validateUniqueEmail = async (email) => {
  const existingClient = await Client.findOne({ email });
  if (existingClient) {
    throw new Error("A client with this email already exists.");
  }
};

/**
 * Validate if a registration date is in the past
 * @param {string} registrationDate Registration date to validate
 */
const validateRegistrationDate = (registrationDate) => {
  if (new Date(registrationDate) > new Date()) {
    throw new Error("Registration date cannot be in the future.");
  }
};

/**
 * Validate if an identification is unique
 * @param {string} identification Identification to validate
 */
const validateUniqueIdentification = async (identification) => {
  const existingClient = await Client.findOne({ identification });
  if (existingClient) {
    throw new Error("A client with this identification already exists.");
  }
};

module.exports = {
  validateEmployeeAssociation,
  verifyCompanyCreditStatus,
  validateUniqueEmail,
  validateRegistrationDate,
  validateUniqueIdentification,
};
