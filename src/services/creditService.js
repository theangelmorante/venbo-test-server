const axios = require("axios");

/**
 * Check the credit status of a client
 * @param {string} clientId Client ID
 * @returns {Object} Credit status object
 */
const checkCreditStatus = async (clientId) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/credits/${clientId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error contacting the credit verification service");
  }
};

module.exports = {
  checkCreditStatus,
};
