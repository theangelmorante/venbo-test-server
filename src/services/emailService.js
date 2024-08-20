/**
 * Simula un envío de correo electrónico.
 * @param {string} to Dirección de correo electrónico del destinatario
 * @param {string} subject Asunto del correo electrónico
 * @param {string} body Cuerpo del correo electrónico
 */
const sendEmail = async (to, subject, body) => {
  console.log(`Sending email to ${to}: ${subject}`);
  console.log(`Body: ${body}`);
};

module.exports = {
  sendEmail,
};
