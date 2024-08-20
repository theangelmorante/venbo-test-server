const { sendEmail } = require("../../../services/emailService");

/**
 * Send a welcome email to the user
 * @param {string} email Email of the user
 */
const sendWelcomeEmail = async (email) => {
  await sendEmail(email, "Welcome!", "Your client account has been created.");
};

module.exports = {
  sendWelcomeEmail,
};
