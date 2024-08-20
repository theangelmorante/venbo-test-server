require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const clientsRoutes = require("./routes/clients");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Middleware de Errores
app.use(errorMiddleware);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/api/client", clientsRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
