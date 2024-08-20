const { sendEmail } = require("../../../services/emailService");

// Envío de correo de bienvenida
const sendWelcomeEmail = async (email) => {
  await sendEmail(email, "Welcome!", "Your client account has been created.");
};

module.exports = {
  sendWelcomeEmail,
};
