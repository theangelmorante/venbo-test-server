const axios = require("axios");

const checkCreditStatus = async (clientId) => {
  // Simulación de una llamada a un API externo
  try {
    const response = await axios.get(
      `https://external-api.com/credits/${clientId}`
    );
    return response.data; // Suponiendo que devuelve un objeto con el estado del crédito
  } catch (error) {
    console.error(error);
    throw new Error("Error contacting the credit verification service");
  }
};

module.exports = {
  checkCreditStatus,
};
