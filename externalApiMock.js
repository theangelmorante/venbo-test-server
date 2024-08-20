// externalApiMock.js
const express = require("express");
const app = express();
const port = 4000;

// Simulación de respuestas del API externo
app.get("/credits/:clientId", (req, res) => {
  const { clientId } = req.params;
  console.log(`Request received for clientId: ${clientId}`);
  // Simulación de diferentes estados de crédito basado en el clientId
  if (Number(clientId) % 2 === 0) {
    res.json({
      isEligible: true,
      activeCredits: 2,
      overdueCredits: 0,
      complianceLevel: "Good",
    });
  } else {
    res.json({
      isEligible: false,
      activeCredits: 3,
      overdueCredits: 1,
      complianceLevel: "Poor",
    });
  }
});

app.listen(port, () => {
  console.log(`External API Mock running on http://localhost:${port}`);
});
