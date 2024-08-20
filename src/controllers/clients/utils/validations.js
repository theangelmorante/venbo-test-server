const Client = require("../../models/client.model");
const { checkCreditStatus } = require("../../services/creditService");

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

// Validación de empleados asociados a otros clientes
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

// Verificación de créditos para clientes de tipo COMPANY
const verifyCompanyCreditStatus = async (clientData) => {
  const { type, identification } = clientData;

  if (type === "COMPANY") {
    const creditStatus = await checkCreditStatus(identification);

    if (!creditStatus.isEligible) {
      throw new Error("Client cannot be created due to credit issues.");
    }
  }
};

const validateUniqueEmail = async (email) => {
  const existingClient = await Client.findOne({ email });
  if (existingClient) {
    throw new Error("A client with this email already exists.");
  }
};

const validateRegistrationDate = (registrationDate) => {
  if (new Date(registrationDate) > new Date()) {
    throw new Error("Registration date cannot be in the future.");
  }
};

const validateAddressFormat = (address) => {
  const addressRegex = /\d+\s[A-Za-z]+\s[A-Za-z]+/; // Ejemplo de regex que requiere un número y al menos dos palabras
  if (!addressRegex.test(address)) {
    throw new Error(
      "Address format is invalid. Please include a street number and name."
    );
  }
};

const validateRequiredFields = (clientData) => {
  const requiredFields = [
    "id",
    "firstName",
    "lastName",
    "email",
    "address",
    "type",
  ];

  requiredFields.forEach((field) => {
    if (!clientData[field]) {
      throw new Error(`Field ${field} is required.`);
    }
  });
};

module.exports = {
  validateEmployeeAssociation,
  verifyCompanyCreditStatus,
  validateUniqueEmail,
  validateRegistrationDate,
  validateAddressFormat,
  validateRequiredFields,
};
