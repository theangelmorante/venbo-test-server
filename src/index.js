require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const clientsRoutes = require("./routes/clients");
const authRoutes = require("./routes/auth");
const errorMiddleware = require("./middlewares/error.middleware");
const setupSwaggerDocs = require("./swagger"); // Importa Swagger

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

setupSwaggerDocs(app);

app.use(errorMiddleware);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/clients", clientsRoutes);
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

module.exports = app;
