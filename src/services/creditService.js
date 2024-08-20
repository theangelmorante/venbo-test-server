const axios = require("axios");

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
