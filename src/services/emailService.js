const sendEmail = async (to, subject, body) => {
  // Simulación de un envío de correo electrónico
  console.log(`Sending email to ${to}: ${subject}`);
  console.log(`Body: ${body}`);
};

module.exports = {
  sendEmail,
};
